import React, { useEffect, useState } from 'react';
import { Canvas, Circle, Line } from '@shopify/react-native-skia';
import { View } from 'react-native';

const Dim14 = () => {
  const [angle, setAngle] = useState(0);

  // Manual animation loop with requestAnimationFrame
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setAngle(prev => prev + 0.01); // Increment angle
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(); // Start the animation loop

    return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
  }, []);

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

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas style={{ width: 400, height: 400 }}>
        <Line
          p1={{ x: centerX, y: 0 }}
          p2={{ x: centerX, y: 400 }}
          color="red"
          strokeWidth={1}
        />
        <Line
          p1={{ x: 0, y: centerY }}
          p2={{ x: 400, y: centerY }}
          color="red"
          strokeWidth={1}
        />
        <Circle cx={centerX} cy={centerY} r={radius} color="blue" />
        <Circle cx={centerX + point2.x} cy={centerY + point2.y} r={radius} color="black" />
        <Line
          p1={{ x: centerX, y: centerY }}
          p2={{ x: centerX + point2.x, y: centerY + point2.y }}
          color="green"
          strokeWidth={1}
        />
        <Line
          p1={{ x: centerX + point2.x, y: centerY + point2.y }}
          p2={{ x: centerX + point2.x + point3.x, y: centerY + point2.y + point3.y }}
          color="green"
          strokeWidth={1}
        />
      </Canvas>
    </View>
  );
};

export default Dim14;

