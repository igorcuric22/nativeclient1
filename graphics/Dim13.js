import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim13 = () => {
  const requestRef = useRef();
  const angleRef = useRef(0);

  const handleCanvas = (canvas) => {
    if (canvas) {
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

      // Draw coordinate system once
      drawCoordinateSystem(ctx, canvas.width, canvas.height);

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCoordinateSystem(ctx, canvas.width, canvas.height);

        angleRef.current += 0.01;
        const angle = angleRef.current;

        const point1 = rotatePoint({ x: 50, y: 0 }, angle);
        const point2 = rotatePoint({ x: 100, y: 0 }, angle);
        const point3 = rotatePoint(point1, angle);

        drawShapes(ctx, canvas.width, canvas.height, point2, point3);

        requestRef.current = requestAnimationFrame(animate);
      };

      // Start animation
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  // Stop animation on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const drawShapes = (ctx, width, height, point2, point3) => {
    const x0 = width / 2;
    const y0 = height / 2;

    // Draw central circle
    ctx.beginPath();
    ctx.arc(x0, y0, 50, 0, Math.PI * 2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw second circle
    ctx.beginPath();
    ctx.arc(x0 + point2.x, y0 + point2.y, 50, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw line connecting points
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + point2.x, y0 + point2.y);
    ctx.lineTo(x0 + point2.x + point3.x, y0 + point2.y + point3.y);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const drawCoordinateSystem = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
  };

  const rotatePoint = ({ x, y }, angle) => {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return {
      x: x * cosA + y * sinA,
      y: -x * sinA + y * cosA,
    };
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim13;
