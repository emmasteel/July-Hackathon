import { AbnLookup } from './components/AbnLookup';

export function App(): JSX.Element {
  return (
    <>
      <header>
        <div className="container">
          <h1>ABN Lookup</h1>
          <p className="tagline">
            An accessible companion demo — GitHub Copilot Hackathon, Team 1.
          </p>
        </div>
      </header>
      <main className="container" id="main">
        <AbnLookup />
      </main>
      <footer className="container">
        <p>
          Sample data only. This demo does not contact the live Australian
          Business Register.
        </p>
      </footer>
    </>
  );
}
