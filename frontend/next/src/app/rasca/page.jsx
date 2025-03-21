'use client'
import { useEffect, useRef, useState } from 'react';

const CanvasWithBackground = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const getCanvasCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
    };

    const erase = (x, y) => {
      context.globalCompositeOperation = 'destination-out'; // Modo de borrado
      context.beginPath();
      context.arc(x, y, 30, 0, Math.PI * 2); // Radio de 5px
      context.fill();
      context.globalCompositeOperation = 'source-over'; // Restaurar modo normal
    };

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = getCanvasCoordinates(e);
      erase(offsetX, offsetY);
    };

    const handleMouseMove = (e) => {
      if (isDrawing) {
        const { offsetX, offsetY } = getCanvasCoordinates(e);
        erase(offsetX, offsetY);
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing]);

  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }} className='border border-solid border-black'>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgray',
          fontSize: '2rem',
          color: 'black',
        }}
      >
        Hola
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer', border: '1px solid black' }}
      />
    </div>
  );
};

export default CanvasWithBackground;