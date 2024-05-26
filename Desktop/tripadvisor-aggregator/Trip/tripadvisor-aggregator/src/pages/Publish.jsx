import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import PageNav from "../components/PageNav/PageNav";
import styles from "./Publish.module.css";

function Publish() {
  return (
    <main className={styles.publish}>
      <PageNav />

      <section>
        <h1>
          Add new data to the <span>tripadvisor aggregator</span> app!
        </h1>
        <h2>
          Insert the latitude and longitude of the location you want to add to
          the app below.
        </h2>
        <Form />
      </section>
    </main>
  );
}

export default Publish;
