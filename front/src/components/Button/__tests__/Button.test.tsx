import { render, screen } from '@testing-library/react';
import React from 'react';

import { Button } from '../Button';

describe('Button.tsx', () => {
  test('test', () => {
    let props = '4';

    render(<Button messageunreded={props} />);

    const element = screen.getByRole('button', { name: props });

    expect(element.textContent).toBe(props);
  });

  test('test', () => {
    let props = '0';

    render(<Button messageunreded={props} />);

    const element = screen.getByRole('button', { name: props });

    expect(element).toHaveStyle({ backgroundColor: '#777' });
  });
});
