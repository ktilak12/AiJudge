import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LifeScoreCard from '../components/LifeScoreCard';

describe('LifeScoreCard Component Tests', () => {
  it('renders overall score and performance label correctly', () => {
    render(
      <LifeScoreCard
        score={85}
        label="Strong Performance"
        title="Today's Life Score"
        subtitle="Consistent focus demonstrated."
      />
    );

    expect(screen.getByText("Today's Life Score")).toBeInTheDocument();
    expect(screen.getByText("Strong Performance")).toBeInTheDocument();
    expect(screen.getByText("/ 100")).toBeInTheDocument();
    expect(screen.getByText("Consistent focus demonstrated.")).toBeInTheDocument();
  });

  it('renders low score alert state for critical reflection', () => {
    render(
      <LifeScoreCard
        score={25}
        label="Serious Reflection Needed"
        title="Daily Trial Score"
      />
    );

    expect(screen.getByText("Serious Reflection Needed")).toBeInTheDocument();
    expect(screen.getByText("Daily Trial Score")).toBeInTheDocument();
  });
});
