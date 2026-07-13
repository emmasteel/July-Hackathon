import { GrantFinder } from './components/GrantFinder';

export function App(): JSX.Element {
  return (
    <>
      <header>
        <div className="container">
          <h1>Grant Finder</h1>
          <p className="tagline">
            An accessible eligibility checker — GitHub Copilot Hackathon, Team 2.
          </p>
        </div>
      </header>
      <main className="container" id="main">
        <GrantFinder />
      </main>
      <footer className="container">
        <p>
          Sample grants data only. This demo does not contact business.gov.au and
          is not financial or eligibility advice.
        </p>
      </footer>
    </>
  );
}
