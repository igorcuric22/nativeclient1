import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const Dim8 = () => {
  const handleCanvas = (canvas) => {
    if (canvas) {
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

      drawDottedCircle(ctx, canvas.width/2, canvas.height/2,50,1,100);

      drawCoordinateSystem(ctx, canvas.width, canvas.height);
      drawCoordinateSystem1(ctx, canvas.width, canvas.height);

      circle(ctx,300,200,50);

      const [x0,y0]=rot(100,0);

      circle(ctx,200+x0,200+y0,50);

    }
  };


  const circle=(ctx,x,y,radius)=>{
        
      ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
  }


  const drawDottedCircle = (ctx, centerX, centerY, radius, dotRadius, dotCount) => {
    for (let i = 0; i < dotCount; i++) {
        // Calculate the angle for each dot in radians
        const angle = (i / dotCount) * 2 * Math.PI;
        
        // Calculate the x and y positions for each dot
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Draw each dot as a small circle
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
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

  const drawCoordinateSystem1 = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;

    const [x0,y0]=rot(-centerX,0);
    const [x1,y1]=rot(centerX,0);
    const [xx0,yy0]=rot(0,centerY);
    const [xx1,yy1]=rot(0,-centerY);


    
    // Draw vertical line (Y-axis)
    ctx.beginPath();
    ctx.moveTo(x0+centerX,y0+centerY);
    ctx.lineTo(x1+centerX,y1+centerY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw horizontal line (X-axis)
    ctx.beginPath();
    ctx.moveTo(xx0+centerX,yy0+centerY);
    ctx.lineTo(xx1+centerX,yy1+centerY);
    ctx.stroke();
  };

  const rot=(x,y)=>{
     const xx=x*Math.cos(Math.PI/3)+y*Math.sin(Math.PI/3);
     const yy=-x*Math.sin(Math.PI/3)+y*Math.cos(Math.PI/3);
     return [xx,yy];
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Canvas ref={handleCanvas} style={{ borderWidth: 1, borderColor: 'black' }} />
    </View>
  );
};

export default Dim8;