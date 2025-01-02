import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim3 = () => {
  const handleCanvas = (canvas) => {
    if (canvas) {
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');

      // Draw a filled circle
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, 2 * Math.PI); // Center (100, 100), radius 50
      ctx.fillStyle = 'blue';
      ctx.fill();

      // Draw a stroked (unfilled) circle
      ctx.beginPath();
      ctx.arc(200, 200, 50, 0, 2 * Math.PI); // Center (200, 200), radius 50
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim3;
