import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Canvas, Circle, Line , Path, Skia } from '@shopify/react-native-skia';

const Dim17 = () => {
  const [angle, setAngle] = useState(0);
  const animationFrameId = useRef(null);
  const angleRef = useRef(0);
  const isAnimating = useRef(false);

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

    angleRef.current += 0.01;
    setAngle(angleRef.current);
    animationFrameId.current = requestAnimationFrame(animate);
  };

  const toggleAnimation = () => {
    if (isAnimating.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
      isAnimating.current = false;
    } else {
      isAnimating.current = true;
      animate();
    }
  };


  return (
    <View style={styles.container}>
      <Canvas style={{ width: 400, height: 400 }}>
        <Line p1={{ x: centerX, y: 0 }} p2={{ x: centerX, y: 400 }} color="red" strokeWidth={1} />
        <Line p1={{ x: 0, y: centerY }} p2={{ x: 400, y: centerY }} color="red" strokeWidth={1} />

        <Circle cx={centerX} cy={centerY} r={radius} style="stroke" strokeWidth={2} />
        <Circle cx={centerX + point2.x} cy={centerY + point2.y} r={radius} style="stroke" strokeWidth={2} />

        <Line p1={{ x: centerX, y: centerY }} p2={{ x: centerX + point2.x, y: centerY + point2.y }} color="green" strokeWidth={1} />
        <Line p1={{ x: centerX + point2.x, y: centerY + point2.y }} p2={{ x: centerX + point2.x + point3.x, y: centerY + point2.y + point3.y }} color="green" strokeWidth={1} />
      
       
  
      
      </Canvas>

      {/* Overlay React Native's Text component */}
      <Text style={[styles.label, { top: centerY + point2.y - 5, left: centerX + point2.x + 5 }]}>
        ({(centerX + point2.x).toFixed(1)}, {(centerY + point2.y).toFixed(1)})
      </Text>
      <Text style={[styles.label, { top: centerY + point2.y + point3.y - 5, left: centerX + point2.x + point3.x + 5 }]}>
        ({(centerX + point2.x + point3.x).toFixed(1)}, {(centerY + point2.y + point3.y).toFixed(1)})
      </Text>

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
  label: {
    position: 'absolute',
    color: 'blue',
    fontSize: 12,
  },
});

export default Dim17;

