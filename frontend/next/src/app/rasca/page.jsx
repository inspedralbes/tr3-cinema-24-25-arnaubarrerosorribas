'use client'
import { useEffect, useRef, useState } from 'react';

const CanvasWithBackground = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Dibujar el fondo del ticket (solo una vez)
    const drawTicketBackground = () => {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Bordes redondeados
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(20, 0);
      context.lineTo(canvas.width - 20, 0);
      context.arc(canvas.width - 20, 20, 20, Math.PI * 1.5, Math.PI * 2);
      context.lineTo(canvas.width, canvas.height - 20);
      context.arc(canvas.width - 20, canvas.height - 20, 20, 0, Math.PI * 0.5);
      context.lineTo(20, canvas.height);
      context.arc(20, canvas.height - 20, 20, Math.PI * 0.5, Math.PI);
      context.lineTo(0, 20);
      context.arc(20, 20, 20, Math.PI, Math.PI * 1.5);
      context.closePath();
      context.stroke();
    };

    drawTicketBackground();

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
      context.arc(x, y, 30, 0, Math.PI * 2);
      context.fill();
      context.globalCompositeOperation = 'source-over'; // Restaurar modo normal
    };

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = getCanvasCoordinates(e);
      erase(offsetX, offsetY);
    };

    const handleMouseMove = (e) => {
      if (isDrawing || isHovered) {
        const { offsetX, offsetY } = getCanvasCoordinates(e);
        erase(offsetX, offsetY);
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDrawing, isHovered]);

  return (
    <div style={{ position: 'relative', width: '300px', height: '500px', margin: 'auto' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
          borderRadius: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Ticket de Compra</h1>
        <p style={{ fontSize: '1rem', textAlign: 'center' }}>
          Gracias por su compra. ¡Vuelva pronto!
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={300}
        height={500}
        style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer', borderRadius: '20px' }}
      />
    </div>
  );
};

export default CanvasWithBackground;
