import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GrantFinder } from '../src/components/GrantFinder';

/**
 * Starter component test. Confirms the form is accessible-by-construction:
 * each field is reachable BY ITS LABEL. During C4, extend with interactions
 * using @testing-library/user-event.
 */
describe('GrantFinder', () => {
  it('renders labelled state and industry selects', () => {
    render(<GrantFinder />);
    expect(screen.getByLabelText(/state or territory/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
  });

  it('renders a real submit button', () => {
    render(<GrantFinder />);
    expect(
      screen.getByRole('button', { name: /find grants/i }),
    ).toBeInTheDocument();
  });

  // TODO (C4): with Copilot, add tests that submit an incomplete form and assert
  // the role="alert" error summary appears, and that a valid submission renders
  // grant cards with "Why it matches" reasons.
});
