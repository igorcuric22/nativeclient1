import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import { Canvas, Path, Skia, Circle, Line } from '@shopify/react-native-skia';

const Cir7 = ({ width = 400, height = 400, pathColor = 'blue', pointColor = 'red', lineColor = 'green' }) => {
  const animationFrameId = useRef(null);
  const [angle, setAngle] = useState(0);
  const [running, setRunning] = useState(true);
  const [tracedPath, setTracedPath] = useState(Skia.Path.Make());
  const [radius1, setRadius1] = useState(50);
  const [radius2, setRadius2] = useState(100);
  const [speed, setSpeed] = useState(0.05);
  const [angleCoefficient, setAngleCoefficient] = useState(1); // Coefficient for modifying the second angle

  const centerX = width / 2;
  const centerY = height / 2;

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

      const newPath = Skia.Path.Make();
      newPath.moveTo(centerX + radius1, centerY);
      for (let a = 0; a <= nextAngle; a += 0.1) {
        const point1 = rotatePoint({ x: radius1, y: 0 }, a);
        const modifiedAngle = a * angleCoefficient; // Apply the coefficient to the angle for the second circle
        const point2 = rotatePoint({ x: radius2, y: 0 },a );
        const point3 = rotatePoint(point1, modifiedAngle);
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
  }, [running, speed, radius1, radius2, angleCoefficient]);

  const toggleAnimation = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  const point1 = rotatePoint({ x: radius1, y: 0 }, angle);
  const modifiedAngle = angle * angleCoefficient; // Apply the coefficient to the angle for the second circle
  const point2 = rotatePoint({ x: radius2, y: 0 }, angle);
  const point3 = rotatePoint(point1, modifiedAngle);

  const movingPointX = centerX + point2.x + point3.x;
  const movingPointY = centerY + point2.y + point3.y;

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        <Path path={tracedPath} color={pathColor} style="stroke" strokeWidth={2} />
        <Line p1={{ x: centerX, y: 0 }} p2={{ x: centerX, y: 400 }} color="red" strokeWidth={1} />
        <Line p1={{ x: 0, y: centerY }} p2={{ x: 400, y: centerY }} color="red" strokeWidth={1} />
        <Circle cx={centerX} cy={centerY} r={radius1} color="blue" style="stroke" />
        <Circle cx={centerX + point2.x} cy={centerY + point2.y} r={radius1} style="stroke" color="black" />
        <Line p1={{ x: centerX, y: centerY }} p2={{ x: centerX + point2.x, y: centerY + point2.y }} color="green" strokeWidth={1} />
        <Line p1={{ x: centerX + point2.x, y: centerY + point2.y }} p2={{ x: movingPointX, y: movingPointY }} color="green" strokeWidth={1} />
        <Circle cx={movingPointX} cy={movingPointY} r={5} color={pointColor} />
      </Canvas>

      <Button title={running ? "Stop" : "Start"} onPress={toggleAnimation} />

      {/* Input fields for radius1, radius2, speed, and angle coefficient */}
      <TextInput
  style={styles.input}
  keyboardType="numeric"
  placeholder="Angle Coefficient"
  value={angleCoefficient.toString()}
  onChangeText={(text) => setAngleCoefficient(parseFloat(text) || 0)}
  
/>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Radius 1"
        value={radius1.toString()}
        onChangeText={(text) => setRadius1(parseFloat(text) || 0)}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Radius 2"
        value={radius2.toString()}
        onChangeText={(text) => setRadius2(parseFloat(text) || 0)}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Speed"
        value={speed.toString()}
        onChangeText={(text) => setSpeed(parseFloat(text) || 0.01)}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    width: 150,
    textAlign: 'center',
  },
});

export default Cir7;
