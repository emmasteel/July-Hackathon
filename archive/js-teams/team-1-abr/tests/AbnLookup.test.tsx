import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AbnLookup } from '../src/components/AbnLookup';

/**
 * Starter component test. Confirms the form is accessible-by-construction:
 * the input is reachable BY ITS LABEL (which fails if the label is missing or
 * only a placeholder). During C4, extend this with user interactions using
 * @testing-library/user-event.
 */
describe('AbnLookup', () => {
  it('renders an input associated with a visible label', () => {
    render(<AbnLookup />);
    // getByLabelText throws if there is no accessible label → guards WCAG 1.3.1.
    const input = screen.getByLabelText(/australian business number/i);
    expect(input).toBeInTheDocument();
  });

  it('renders a real submit button', () => {
    render(<AbnLookup />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  // TODO (C4): with Copilot, add tests that:
  //  - type an invalid ABN, submit, and assert role="alert" appears
  //  - type a valid ABN present in the fixtures and assert the result card shows
});
