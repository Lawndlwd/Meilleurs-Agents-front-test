import { render, screen } from '@testing-library/react';
import React from 'react';

import { ShortText } from '../ShortText';
describe('ShortText.tsx', () => {
  test('test', () => {
    let long = 80;
    let text =
      "Lorem Ipsum #10296 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    let read = false;
    const position = text.indexOf(' ', long);

    const expexted = text.substring(0, position) + '...';
    render(<ShortText long={long} read={read} text={text} />);
    const element = screen.getByRole('article');

    expect(element.textContent).toBe(expexted);
  });
});
