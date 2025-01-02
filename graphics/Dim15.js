import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Canvas, Circle, Line } from '@shopify/react-native-skia';

const Dim15 = () => {
  const [angle, setAngle] = useState(0);      // Visible angle for rendering
  const animationFrameId = useRef(null);      // Holds the requestAnimationFrame ID
  const angleRef = useRef(0);                 // Angle to increment without re-rendering
  const isAnimating = useRef(false);          // Track if the animation is running

  const centerX = 200;
  const centerY = 200;
  const radius = 50;

  const rotatePoint = ({ x, y }, angle) => {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return {
      x: x * cosA - y * sinA,
      y: x * sinA + y * cosA,
    };
  };

  const point1 = rotatePoint({ x: 50, y: 0 }, angle);
  const point2 = rotatePoint({ x: 100, y: 0 }, angle);
  const point3 = rotatePoint(point1, angle);

  const animate = () => {
    if (!isAnimating.current) return;

    angleRef.current += 0.01;                // Increment angle in the ref
    setAngle(angleRef.current);              // Update state for re-render
    animationFrameId.current = requestAnimationFrame(animate); // Schedule next frame
  };

  const toggleAnimation = () => {
    if (isAnimating.current) {
      // Stop the animation
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
      isAnimating.current = false;
    } else {
      // Start the animation
      isAnimating.current = true;
      animate();
    }
  };

  return (
    <View style={styles.container}>
      <Canvas style={{ width: 400, height: 400 }}>
        <Line p1={{ x: centerX, y: 0 }} p2={{ x: centerX, y: 400 }} color="red" strokeWidth={1} />
        <Line p1={{ x: 0, y: centerY }} p2={{ x: 400, y: centerY }} color="red" strokeWidth={1} />
        <Circle cx={centerX} cy={centerY} r={radius} color="blue" />
        <Circle cx={centerX + point2.x} cy={centerY + point2.y} r={radius} color="black" />
        <Line p1={{ x: centerX, y: centerY }} p2={{ x: centerX + point2.x, y: centerY + point2.y }} color="green" strokeWidth={1} />
        <Line p1={{ x: centerX + point2.x, y: centerY + point2.y }} p2={{ x: centerX + point2.x + point3.x, y: centerY + point2.y + point3.y }} color="green" strokeWidth={1} />
      </Canvas>

      <Button title={isAnimating.current ? "Stop Animation" : "Start Animation"} onPress={toggleAnimation} />
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

export default Dim15;
