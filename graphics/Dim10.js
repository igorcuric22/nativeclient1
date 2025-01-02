import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim10 = () => {
  const handleCanvas = (canvas) => {
    if (canvas) {
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

     drawCoordinateSystem(ctx, canvas.width, canvas.height);
     
      let i=0;

      const interval = setInterval(() => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

      i+= 0.01;


      let [x11,y11]=rot(50,0,i);
      let [x22,y22]=rot(100,0,i);
      let [x33,y33]=rot(x11,y11,i);


      drawx(ctx, canvas.width, canvas.height, x22, y22, x33, y33);
  
        if (i>2*Math.PI) {
          clearInterval(interval); 

        }
      }, 15); 

    }
  };



  const drawx = (ctx, width, height, x22, y22, x33, y33) => {
    const x0 = width / 2;
    const y0 = height / 2;

    // Draw the first circle
    ctx.beginPath();
    ctx.arc(x0, y0, 50, 0, Math.PI * 2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw the second circle
    ctx.beginPath();
    ctx.arc(x0 + x22, y0 + y22, 50, 0, Math.PI * 2);
    ctx.stroke();

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + x22, y0 + y22);
    ctx.lineTo(x0 + x22 + x33, y0 + y22 + y33);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();
};

  

  const drawCoordinateSystem = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw vertical line (Y-axis)
    ctx.beginPath();
    ctx.moveTo(centerX,0);
    ctx.lineTo(centerX,height);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw horizontal line (X-axis)
    ctx.beginPath();
    ctx.moveTo(0,centerY);
    ctx.lineTo(width,centerY);
    ctx.stroke();
  };

 

  const rot=(x,y,i)=>{
     const xx=x*Math.cos(i)+y*Math.sin(i);
     const yy=-x*Math.sin(i)+y*Math.cos(i);
     return [xx,yy];
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim10;