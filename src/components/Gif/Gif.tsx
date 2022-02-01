import React from 'react';
import { Image } from 'antd';

export interface GifProps {
  src: string;
  preview: string;
}

export function Gif({ src, preview }: GifProps) {
  return <Image src={src} preview={{ src: preview }} data-testid="image" />
}