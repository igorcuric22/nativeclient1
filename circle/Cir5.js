import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Canvas, Path, Skia, Circle, Line } from '@shopify/react-native-skia';

const Cir5 = ({ width = 400, height = 400, radius = 50 , speed = 0.05, pathColor = 'blue', 
    pointColor = 'red', lineColor = 'green' }) => {
        
  const animationFrameId = useRef(null);
  const [angle, setAngle] = useState(0);
  const [running, setRunning] = useState(true);
  const [tracedPath, setTracedPath] = useState(Skia.Path.Make());

  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate the current position of the moving point
  const rotatePoint = ({ x, y }, angle) => {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return {
      x: x * cosA + y * sinA,
      y: -x * sinA + y * cosA,
    };
  };

  const animate = () => {
    setAngle((prevAngle) => {
      let nextAngle = prevAngle + speed;

      // Update tracedPath to show only up to the current position
      const newPath = Skia.Path.Make();
      newPath.moveTo(centerX + radius, centerY); // Start at the rightmost point of the circle
      for (let a = 0; a <= nextAngle; a += 0.1) {
        const point1 = rotatePoint({ x: 50, y: 0 }, a);
        const point2 = rotatePoint({ x: 100, y: 0 }, a);
        const point3 = rotatePoint(point1, a);
        newPath.lineTo(centerX + point2.x + point3.x, centerY + point2.y + point3.y);
      }
      setTracedPath(newPath);

      if (nextAngle >= 2 * Math.PI) nextAngle = 0;

      return nextAngle;
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (running) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [running]);

  const toggleAnimation = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  // Calculate points based on angle
  const point1 = rotatePoint({ x: 50, y: 0 }, angle);
  const point2 = rotatePoint({ x: 100, y: 0 }, angle);
  const point3 = rotatePoint(point1, angle);

  const movingPointX = centerX + point2.x + point3.x;
  const movingPointY = centerY + point2.y + point3.y;

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        {/* Render the traced circular path */}
        <Path path={tracedPath} color={pathColor} style="stroke" strokeWidth={2} />

        {/* Lines and circles */}
        <Line p1={{ x: centerX, y: 0 }} p2={{ x: centerX, y: 400 }} color="red" strokeWidth={1} />
        <Line p1={{ x: 0, y: centerY }} p2={{ x: 400, y: centerY }} color="red" strokeWidth={1} />
        <Circle cx={centerX} cy={centerY} r={radius} color="blue" style="stroke" />
        <Circle cx={centerX + point2.x} cy={centerY + point2.y} r={radius} style="stroke" color="black" />
        <Line p1={{ x: centerX, y: centerY }} p2={{ x: centerX + point2.x, y: centerY + point2.y }} color="green" strokeWidth={1} />
        <Line p1={{ x: centerX + point2.x, y: centerY + point2.y }} p2={{ x: centerX + point2.x + point3.x, y: centerY + point2.y + point3.y }} color="green" strokeWidth={1} />

        {/* Moving circle */}
        <Circle cx={movingPointX} cy={movingPointY} r={5} color={pointColor} />
      </Canvas>

      {/* Button to toggle animation */}
      <Button title={running ? "Stop" : "Start"} onPress={toggleAnimation} />
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

export default Cir5;

