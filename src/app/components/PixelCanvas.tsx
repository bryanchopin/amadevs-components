'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface PixelProps {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  delay: number;
}

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor({ canvas, context, x, y, color, speed, delay }: PixelProps) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  draw(): void {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear(): void {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear(): void {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer(): void {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({
  colors = ['#f8fafc', '#f1f5f9', '#cbd5e1'],
  gap = 5,
  speed = 35,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timePreviousRef = useRef<number>(0);
  const timeInterval = 1000 / 60;

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const newPixels: Pixel[] = [];
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : getDistanceToCanvasCenter(x, y, width, height);
        newPixels.push(new Pixel({ canvas, context: ctx, x, y, color, speed: speed * 0.001, delay }));
      }
    }
    pixelsRef.current = newPixels;
  }, [colors, gap, speed]);

  const getDistanceToCanvasCenter = (x: number, y: number, width: number, height: number): number => {
    const dx = x - width / 2;
    const dy = y - height / 2;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const animate = useCallback(() => {
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;

    if (timePassed < timeInterval) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pixelsRef.current.length; i++) {
      pixelsRef.current[i].appear();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [timeInterval]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      init();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [init, animate]);

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
};

export default PixelCanvas;
