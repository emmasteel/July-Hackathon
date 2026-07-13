import { useId, useState } from 'react';
import {
  findGrants,
  validateProfile,
  STATES,
  INDUSTRIES,
  type BusinessProfile,
  type EligibilityResult,
  type State,
  type Industry,
} from '../lib/eligibility';

type FormValues = {
  state: string;
  industry: string;
  employees: string;
  annualTurnover: string;
  yearsTrading: string;
};

const EMPTY_FORM: FormValues = {
  state: '',
  industry: '',
  employees: '',
  annualTurnover: '',
  yearsTrading: '',
};

/**
 * Accessible grant eligibility checker.
 *
 * Accessibility notes (WCAG 2.2 AA) addressed here:
 * - Every field has an associated, visible <label> (1.3.1 / 3.3.2).
 * - Errors are linked with aria-describedby, marked aria-invalid, and the error
 *   summary uses role="alert" so it is announced (3.3.1 / 4.1.3).
 * - Results live in an aria-live region (4.1.3).
 * - Real <form>, <select>, <button> → full keyboard support (2.1.1).
 * - Each result explains WHY it matched (transparency + not colour-only, 1.4.1).
 *
 * Residual risks to verify with axe-core + a keyboard walkthrough: colour
 * contrast of the theme and focus-visible styling (see styles.css).
 */
export function GrantFinder(): JSX.Element {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<EligibilityResult[] | null>(null);

  const ids = {
    state: useId(),
    industry: useId(),
    employees: useId(),
    annualTurnover: useId(),
    yearsTrading: useId(),
    errorSummary: useId(),
  };

  function update(field: keyof FormValues, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    // Security: parse and validate untrusted input at the boundary.
    const profile: Partial<BusinessProfile> = {
      state: (form.state || undefined) as State | undefined,
      industry: (form.industry || undefined) as Industry | undefined,
      employees: form.employees === '' ? NaN : Number(form.employees),
      annualTurnover:
        form.annualTurnover === '' ? NaN : Number(form.annualTurnover),
      yearsTrading: form.yearsTrading === '' ? NaN : Number(form.yearsTrading),
    };

    const validation = validateProfile(profile);
    if (!validation.valid) {
      setErrors(validation.errors);
      setResults(null);
      return;
    }

    setErrors({});
    setResults(findGrants(profile as BusinessProfile));
  }

  const errorList = Object.entries(errors);

  return (
    <section aria-labelledby="finder-heading">
      <h2 id="finder-heading">Check which grants you may be eligible for</h2>

      <form onSubmit={handleSubmit} noValidate>
        {errorList.length > 0 ? (
          <div role="alert" id={ids.errorSummary} className="error-summary">
            <p>Please fix the following:</p>
            <ul>
              {errorList.map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="field">
          <label htmlFor={ids.state}>State or territory</label>
          <select
            id={ids.state}
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
            aria-invalid={Boolean(errors.state)}
          >
            <option value="">Choose…</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={ids.industry}>Industry</label>
          <select
            id={ids.industry}
            value={form.industry}
            onChange={(e) => update('industry', e.target.value)}
            aria-invalid={Boolean(errors.industry)}
          >
            <option value="">Choose…</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <NumberField
          id={ids.employees}
          label="Number of employees"
          value={form.employees}
          error={errors.employees}
          onChange={(v) => update('employees', v)}
        />
        <NumberField
          id={ids.annualTurnover}
          label="Annual turnover (AUD)"
          value={form.annualTurnover}
          error={errors.annualTurnover}
          onChange={(v) => update('annualTurnover', v)}
        />
        <NumberField
          id={ids.yearsTrading}
          label="Years trading"
          value={form.yearsTrading}
          error={errors.yearsTrading}
          onChange={(v) => update('yearsTrading', v)}
        />

        <button type="submit">Find grants</button>
      </form>

      <div aria-live="polite" className="results">
        {results ? <ResultsList results={results} /> : null}
      </div>
    </section>
  );
}

function NumberField(props: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}): JSX.Element {
  const errorId = `${props.id}-error`;
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type="number"
        min={0}
        inputMode="numeric"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        aria-invalid={Boolean(props.error)}
        aria-describedby={props.error ? errorId : undefined}
      />
      {props.error ? (
        <p id={errorId} className="error">
          {props.error}
        </p>
      ) : null}
    </div>
  );
}

function ResultsList({
  results,
}: {
  results: readonly EligibilityResult[];
}): JSX.Element {
  const eligibleCount = results.filter((r) => r.eligible).length;
  return (
    <>
      <h3>
        {eligibleCount} of {results.length} grants match your business
      </h3>
      <ul className="grant-list">
        {results.map((result) => (
          <li key={result.grant.id}>
            <article
              className={
                result.eligible
                  ? 'grant-card grant-card--eligible'
                  : 'grant-card grant-card--ineligible'
              }
            >
              <h4>{result.grant.name}</h4>
              {/* Status conveyed by text, not colour alone (WCAG 1.4.1). */}
              <p className="grant-status">
                {result.eligible ? 'Likely eligible' : 'Not eligible'} —{' '}
                {result.grant.description}
              </p>
              <p>
                <strong>Amount:</strong> $
                {result.grant.amount.toLocaleString('en-AU')}
              </p>
              {result.reasonsFor.length > 0 ? (
                <div>
                  <p className="reasons-heading">Why it matches:</p>
                  <ul>
                    {result.reasonsFor.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {result.reasonsAgainst.length > 0 ? (
                <div>
                  <p className="reasons-heading">Why it doesn&apos;t match:</p>
                  <ul>
                    {result.reasonsAgainst.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
