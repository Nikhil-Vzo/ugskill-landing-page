'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'down' | 'left' | 'right' | 'none';
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
  hoverTrailAmount?: number;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = 'diagonal',
  speed = 0.5,
  squareSize = 40,
  borderColor = 'rgba(226, 232, 240, 0.4)', // Slate 200/40
  hoverFillColor = 'rgba(88, 204, 2, 0.08)', // Feather green hover highlight
  hoverTrailAmount = 0.96 // Springy fade multiplier
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const gridStateRef = useRef<{ [key: string]: number }>({});
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI displays
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: null, y: null });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animationId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Update grid offsets based on animation speed
      if (direction !== 'none') {
        const delta = speed * 0.4;
        if (direction === 'diagonal') {
          offsetRef.current.x = (offsetRef.current.x - delta) % squareSize;
          offsetRef.current.y = (offsetRef.current.y - delta) % squareSize;
        } else if (direction === 'up') {
          offsetRef.current.y = (offsetRef.current.y - delta) % squareSize;
        } else if (direction === 'down') {
          offsetRef.current.y = (offsetRef.current.y + delta) % squareSize;
        } else if (direction === 'left') {
          offsetRef.current.x = (offsetRef.current.x - delta) % squareSize;
        } else if (direction === 'right') {
          offsetRef.current.x = (offsetRef.current.x + delta) % squareSize;
        }
      }

      const offsetX = offsetRef.current.x;
      const offsetY = offsetRef.current.y;

      const cols = Math.ceil(width / squareSize) + 2;
      const rows = Math.ceil(height / squareSize) + 2;

      // Find active cell under mouse
      let hoveredCol: number | null = null;
      let hoveredRow: number | null = null;
      
      if (mousePos.x !== null && mousePos.y !== null) {
        hoveredCol = Math.floor((mousePos.x - offsetX) / squareSize);
        hoveredRow = Math.floor((mousePos.y - offsetY) / squareSize);
      }

      // Decrement existing trails and trigger random flickers to make background alive
      const gridState = gridStateRef.current;
      Object.keys(gridState).forEach(key => {
        gridState[key] *= hoverTrailAmount;
        if (gridState[key] < 0.01) {
          delete gridState[key];
        }
      });

      // Twinkling effect: Randomly light up a few grid cells
      if (Math.random() < 0.25) {
        const randCol = Math.floor(Math.random() * cols);
        const randRow = Math.floor(Math.random() * rows);
        const key = `${randCol}_${randRow}`;
        if (!gridState[key]) {
          gridState[key] = Math.random() * 0.25 + 0.05;
        }
      }

      // Set hovered cell trail to max intensity
      if (hoveredCol !== null && hoveredRow !== null) {
        const key = `${hoveredCol}_${hoveredRow}`;
        gridState[key] = 1.0;

        // Spread effect: slightly light up adjacent squares for a soft volumetric glow
        const adjacents = [
          [1, 0], [-1, 0], [0, 1], [0, -1]
        ];
        adjacents.forEach(([dx, dy]) => {
          const adjKey = `${hoveredCol! + dx}_${hoveredRow! + dy}`;
          if (!gridState[adjKey] || gridState[adjKey] < 0.35) {
            gridState[adjKey] = 0.35;
          }
        });
      }

      // Draw Grid Lines and Square Fills
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;

      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          const xPos = c * squareSize + offsetX;
          const yPos = r * squareSize + offsetY;

          // Fill cell if it has active trail
          const key = `${c}_${r}`;
          const intensity = gridState[key] || 0;
          
          if (intensity > 0) {
            ctx.fillStyle = hoverFillColor.replace(/[\d.]+\)$/, `${intensity * 0.08})`);
            ctx.fillRect(xPos, yPos, squareSize, squareSize);
          }

          // Draw grid cell outline
          ctx.strokeRect(xPos, yPos, squareSize, squareSize);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [direction, speed, squareSize, borderColor, hoverFillColor, hoverTrailAmount, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 block h-full w-full pointer-events-auto"
    />
  );
};
