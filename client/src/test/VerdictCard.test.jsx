import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VerdictCard from '../components/VerdictCard';

describe('VerdictCard Component Tests', () => {
  it('renders official judicial decree with persona information', () => {
    const verdictText = 'You managed to negotiate yourself out of 3 hours of real work today.';
    render(
      <VerdictCard
        verdict={verdictText}
        personality="Savage but Fair"
        confidence="high"
      />
    );

    expect(screen.getByText('SUPREME COURT VERDICT')).toBeInTheDocument();
    expect(screen.getByText('PRESIDING JUDGE: SAVAGE BUT FAIR')).toBeInTheDocument();
    expect(screen.getByText('CONFIDENCE: HIGH')).toBeInTheDocument();
    expect(screen.getByText(`"${verdictText}"`)).toBeInTheDocument();
  });
});
