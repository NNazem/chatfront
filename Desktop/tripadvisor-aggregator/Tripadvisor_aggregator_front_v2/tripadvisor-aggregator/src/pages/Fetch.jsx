import LocationList from "../components/LocationList/LocationList";
import PageNav from "../components/PageNav/PageNav";
import styles from "./Fetch.module.css";

function Fetch() {
  return (
    <main className={styles.fetch}>
      <PageNav />

      <section>
        <h1>
          Welcome to the <span>tripadvisor aggregator</span> fetch page!
        </h1>
        <h2>
          Down below you will find the fetched data from the TripAdvisor API.
        </h2>
        <LocationList />
      </section>
    </main>
  );
}

export default Fetch;
