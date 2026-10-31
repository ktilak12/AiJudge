import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImprovementCard from '../components/ImprovementCard';

describe('ImprovementCard Component Tests', () => {
  it('renders 3-point correction protocol accurately', () => {
    const improvements = [
      'Establish a strict 90-minute morning deep work block.',
      'Place phone outside of the workspace during focus hours.',
      'Maintain an 8-hour sleep duration tonight.'
    ];

    render(<ImprovementCard improvements={improvements} />);

    expect(screen.getByText('3-POINT CORRECTION PROTOCOL')).toBeInTheDocument();
    expect(screen.getByText(improvements[0])).toBeInTheDocument();
    expect(screen.getByText(improvements[1])).toBeInTheDocument();
    expect(screen.getByText(improvements[2])).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });
});
