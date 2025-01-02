import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim7 = () => {
  const handleCanvas = (canvas) => {
    if (canvas) {
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

      // Draw a sine wave on the canvas
      drawSineWave(ctx, canvas.width, canvas.height / 2, 100, 2);

      // Draw coordinate system
      drawCoordinateSystem(ctx, canvas.width, canvas.height);
    }
  };

  const drawSineWave = (ctx, width, centerY, amplitude, frequency) => {
    ctx.beginPath();
    ctx.moveTo(0, centerY); // Start at the left edge of the canvas

    for (let x = 0; x < width; x++) {
      const y = centerY + amplitude * Math.sin((frequency * x * Math.PI) / 180);
      ctx.lineTo(x, y); // Draw each point of the wave
    }

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawCoordinateSystem = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw vertical line (Y-axis)
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw horizontal line (X-axis)
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim7;
