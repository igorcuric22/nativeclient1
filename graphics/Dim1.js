import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim1 = () => {
  // Function that runs when the canvas is ready
  const handleCanvas = (canvas) => {
    if (canvas) {
      // Set canvas dimensions
      canvas.width = 300;
      canvas.height = 300;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(50, 50, 200, 200); // Draws a blue square
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim1;
