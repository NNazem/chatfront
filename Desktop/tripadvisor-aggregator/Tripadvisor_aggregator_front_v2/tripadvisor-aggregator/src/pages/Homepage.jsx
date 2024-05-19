import { Link } from "react-router-dom";
import PageNav from "../components/PageNav/PageNav";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Welcome to the <span>tripadvisor aggregator</span> homepage!
        </h1>
        <h2>
          This is the homepage of the tripadvisor aggregator app. <br />
          It is a simple app that aggregates data from the TripAdvisor API.
        </h2>
        <Link to="/publish" className="cta">
          Start Publishing now
        </Link>
      </section>
    </main>
  );
}

export default Homepage;
