import { useId, useState } from 'react';
import { formatAbn, validateAbn } from '../lib/abn';
import { lookupAbn, type BusinessRecord } from '../lib/lookup';

type LookupState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'not-found'; abn: string }
  | { status: 'found'; record: BusinessRecord };

/**
 * Accessible ABN lookup.
 *
 * Accessibility notes (WCAG 2.2 AA) addressed here:
 * - The input has an associated, visible <label> (1.3.1 / 3.3.2).
 * - Errors use role="alert" and aria-describedby so they are announced (4.1.3 / 3.3.1).
 * - Results are placed in an aria-live region so screen readers hear the update (4.1.3).
 * - Real <form> and <button> elements → full keyboard support (2.1.1).
 * - aria-invalid is toggled on the field when there's an error (4.1.2).
 *
 * Residual risks to verify with the axe-core check + a keyboard walkthrough:
 * colour contrast of the theme, and focus-visible styling (see styles.css).
 */
export function AbnLookup(): JSX.Element {
  const [abnInput, setAbnInput] = useState('');
  const [state, setState] = useState<LookupState>({ status: 'idle' });

  const inputId = useId();
  const hintId = useId();
  const errorId = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    // Security: validate untrusted input at the boundary before using it.
    const result = validateAbn(abnInput);
    if (!result.valid) {
      setState({ status: 'error', message: result.reason });
      return;
    }

    const record = lookupAbn(result.normalised);
    if (!record) {
      setState({ status: 'not-found', abn: formatAbn(result.normalised) });
      return;
    }

    setState({ status: 'found', record });
  }

  const hasError = state.status === 'error';

  return (
    <section aria-labelledby="lookup-heading">
      <h2 id="lookup-heading">Look up an ABN</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor={inputId}>Australian Business Number (ABN)</label>
          <p id={hintId} className="hint">
            Enter the 11-digit ABN. Spaces are allowed.
          </p>
          <input
            id={inputId}
            name="abn"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={abnInput}
            onChange={(event) => setAbnInput(event.target.value)}
            aria-describedby={hasError ? `${hintId} ${errorId}` : hintId}
            aria-invalid={hasError}
          />
        </div>

        {hasError ? (
          <p id={errorId} role="alert" className="error">
            {state.message}
          </p>
        ) : null}

        <button type="submit">Search</button>
      </form>

      <div aria-live="polite" className="results">
        {state.status === 'found' ? (
          <ResultCard record={state.record} />
        ) : null}
        {state.status === 'not-found' ? (
          <p>
            No business found for ABN <strong>{state.abn}</strong> in the sample
            data.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ResultCard({ record }: { record: BusinessRecord }): JSX.Element {
  return (
    <article className="result-card" aria-label="Search result">
      <h3>{record.entityName}</h3>
      <dl>
        <dt>ABN</dt>
        <dd>{formatAbn(record.abn)}</dd>
        <dt>Status</dt>
        {/* Status is conveyed by text, not colour alone (WCAG 1.4.1). */}
        <dd>
          <span
            className={
              record.abnStatus === 'Active'
                ? 'status status--active'
                : 'status status--cancelled'
            }
          >
            {record.abnStatus}
          </span>
        </dd>
        <dt>Entity type</dt>
        <dd>{record.entityType}</dd>
        <dt>Location</dt>
        <dd>
          {record.state} {record.postcode}
        </dd>
        <dt>GST registered</dt>
        <dd>{record.gstRegistered ? 'Yes' : 'No'}</dd>
      </dl>
    </article>
  );
}
