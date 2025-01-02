import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Path, Skia, Circle } from '@shopify/react-native-skia';

const SineWaveWithPoint = () => {
  const width = 400;  // Width of the canvas
  const height = 200; // Height of the canvas
  const amplitude = 50; // Amplitude of the sine wave
  const frequency = 0.05; // Frequency of the wave
  const animationFrameId = useRef(null); // Ref for the animation frame ID
  const [position, setPosition] = useState({ x: 0, y: height / 2 });

  // Create a path for the sine wave
  const path = Skia.Path.Make();
  path.moveTo(0, height / 2);

  for (let x = 0; x <= width; x++) {
    const y = height / 2 + amplitude * Math.sin(frequency * x);
    path.lineTo(x, y);
  }

  // Animation function
  const animate = (time) => {
    const speed = 0.5; // Control speed of movement
    const nextX = (position.x + speed) % width; // Loop back to start when reaching the end
    const nextY = height / 2 + amplitude * Math.sin(frequency * nextX);
    
    setPosition({ x: nextX, y: nextY });
    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Start the animation
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        <Path path={path} color="blue" style="stroke" strokeWidth={2} />
        <Circle cx={position.x} cy={position.y} r={5} color="red" />
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

export default SineWaveWithPoint;
