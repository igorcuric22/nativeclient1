import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Path, Skia, Circle } from '@shopify/react-native-skia';

const Cir2 = ({ width = 400, height = 400, radius = 100, speed = 0.05, pathColor = 'blue', pointColor = 'red' }) => {
  const animationFrameId = useRef(null);
  const [angle, setAngle] = useState(0);
  const [tracedPath, setTracedPath] = useState(Skia.Path.Make());

  const centerX = width / 2;
  const centerY = height / 2;

  const animate = () => {
    setAngle((prevAngle) => {
      const nextAngle = prevAngle + speed;

      // Calculate new x, y based on circular motion
      const x = centerX + radius * Math.cos(nextAngle);
      const y = centerY + radius * Math.sin(nextAngle);

      // Update tracedPath to show only up to the current position
      const newPath = Skia.Path.Make();
      newPath.moveTo(centerX + radius, centerY); // Start at the rightmost point of the circle
      for (let a = 0; a <= nextAngle; a += 0.1) {
        const pathX = centerX + radius * Math.cos(a);
        const pathY = centerY + radius * Math.sin(a);
        newPath.lineTo(pathX, pathY);
      }
      setTracedPath(newPath);

      if (nextAngle>=Math.Pi) nextAngle=0;

      return nextAngle;
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        {/* Render the traced circular path */}
        <Path path={tracedPath} color={pathColor} style="stroke" strokeWidth={2} />
        {/* Moving circle */}
        <Circle cx={centerX + radius * Math.cos(angle)} cy={centerY + radius * Math.sin(angle)} r={5} color={pointColor} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cir2;

