import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryScoreCard from '../components/CategoryScoreCard';

describe('CategoryScoreCard Component Tests', () => {
  it('renders productivity category score and reason properly', () => {
    render(
      <CategoryScoreCard
        categoryKey="productivity"
        score={90}
        reason="Completed 6 hours of uninterrupted focus sprints."
      />
    );

    expect(screen.getByText('Productivity')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('/100')).toBeInTheDocument();
    expect(screen.getByText('Completed 6 hours of uninterrupted focus sprints.')).toBeInTheDocument();
  });

  it('renders discipline category correctly with custom rating', () => {
    render(
      <CategoryScoreCard
        categoryKey="discipline"
        score={45}
        reason="Repeatedly gave in to distraction."
      />
    );

    expect(screen.getByText('Discipline')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Repeatedly gave in to distraction.')).toBeInTheDocument();
  });
});
