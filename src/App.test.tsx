import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  render(<App />);
  const linkElement = screen.getByText("Giphy Search");
  expect(linkElement).toBeInTheDocument();
});
