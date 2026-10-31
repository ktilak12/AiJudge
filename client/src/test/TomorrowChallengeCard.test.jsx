import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TomorrowChallengeCard from '../components/TomorrowChallengeCard';

describe('TomorrowChallengeCard Component Tests', () => {
  it('renders challenge statement and handles accept challenge toggle', () => {
    const challengeText = 'Complete the highest leverage postponed task before opening social media.';
    render(<TomorrowChallengeCard challenge={challengeText} />);

    expect(screen.getByText("TOMORROW'S MANDATORY CHALLENGE")).toBeInTheDocument();
    expect(screen.getByText(challengeText)).toBeInTheDocument();

    const acceptButton = screen.getByText('Accept Challenge');
    expect(acceptButton).toBeInTheDocument();

    fireEvent.click(acceptButton);
    expect(screen.getByText('Accepted')).toBeInTheDocument();
  });
});
