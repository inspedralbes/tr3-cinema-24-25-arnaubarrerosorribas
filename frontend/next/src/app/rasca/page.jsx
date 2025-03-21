'use client'
import { useEffect, useRef, useState } from 'react';

const CanvasWithBackground = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Inicializar el canvas con un fondo blanco solo al montar el componente
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Función para obtener las coordenadas relativas al canvas
    const getCanvasCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
    };

    // Función para borrar en la posición del ratón
    const erase = (x, y) => {
      context.globalCompositeOperation = 'destination-out'; // Modo de borrado
      context.beginPath();
      context.arc(x, y, 30, 0, Math.PI * 2); // Radio de 5px
      context.fill();
      context.globalCompositeOperation = 'source-over'; // Restaurar modo normal
    };

    // Evento de ratón: comenzar a borrar
    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = getCanvasCoordinates(e);
      erase(offsetX, offsetY);
    };

    // Evento de ratón: borrar mientras se arrastra
    const handleMouseMove = (e) => {
      if (isDrawing) {
        const { offsetX, offsetY } = getCanvasCoordinates(e);
        erase(offsetX, offsetY);
      }
    };

    // Evento de ratón: dejar de borrar
    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    // Asignar eventos al canvas
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Limpiar eventos al desmontar el componente
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing]);

  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      {/* Div con el texto "Hola" */}
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

      {/* Canvas superpuesto */}
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ position: 'absolute', top: 0, left: 0, cursor: 'crosshair' }}
      />
    </div>
  );
};

export default CanvasWithBackground;