import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim4 = () => {
  const handleCanvas = (canvas) => {
    if (canvas) {
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

      // Draw a rectangle as a background reference
      ctx.fillStyle = 'lightgray';
      ctx.fillRect(20, 20, 360, 360); // Draws a light gray rectangle

      // Draw an asteroid
      drawAsteroid(ctx, 200, 200, 80);
    }
  };

  const drawAsteroid = (ctx, x, y, radius) => {
    const points = 12; // Number of points to give it a rough, irregular look
    const angleStep = (Math.PI * 2) / points; // Divide circle into sections

    ctx.beginPath();

    // Create random points around the radius
    for (let i = 0; i < points; i++) {
      // Randomize the radius for jagged edges
      const angle = i * angleStep;
      const randomRadius = radius + Math.random() * 10 - 5; // Random offset
      const pointX = x + randomRadius * Math.cos(angle);
      const pointY = y + randomRadius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(pointX, pointY); // Start at the first point
      } else {
        ctx.lineTo(pointX, pointY); // Draw lines between points
      }
    }

    ctx.closePath(); // Connect last point to the first
    ctx.fillStyle = 'darkgray';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim4;
