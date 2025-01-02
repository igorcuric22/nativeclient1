import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim2 = () => {
  // Function that runs when the canvas is ready
  const handleCanvas = (canvas) => {
    if (canvas) {
      // Set canvas dimensions
      canvas.width = 300;
      canvas.height = 300;

      const ctx = canvas.getContext('2d');

      // Draw a blue square
    //   ctx.fillStyle = 'blue';
    //   ctx.fillRect(50, 50, 200, 200);

      // Draw a point
      ctx.fillStyle = 'red';  // Set color for the point
      ctx.fillRect(170, 150, 2, 2); // Small rectangle to simulate a point at (150, 150)

      // Draw a line
      ctx.strokeStyle = 'green';  // Set color for the line
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(75, 75);        // Starting point of the line
      ctx.lineTo(225, 225);      // Ending point of the line
      ctx.stroke();              // Draw the line
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim2;
