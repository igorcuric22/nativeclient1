import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim6 = () => {
  const canvasRef = useRef(null); // Define a ref for the Canvas

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

      // Draw a sine wave on the canvas
      drawSineWave(ctx, canvas.width, canvas.height / 2, 100, 2);
    }
  }, []);

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

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={canvasRef} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim6;
