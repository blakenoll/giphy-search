import React from 'react';
import { render, screen } from '@testing-library/react';
import { Gif, GifProps } from './Gif'


const props = {
  src: 'url',
  preview: 'url'
}


describe('Gif', () => {
  test('renders a image', () => {
    render(<Gif {...props} />)
    expect(screen.getAllByRole('img')[0]).toBeInTheDocument()
  })
})