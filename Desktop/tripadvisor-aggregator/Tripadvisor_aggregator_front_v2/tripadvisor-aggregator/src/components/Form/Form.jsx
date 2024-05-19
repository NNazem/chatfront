import Button from "../Button/Button";
import styles from "./Form.module.css";

function Form() {
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="latitude">Latitude</label>
        <input type="text" id="latitude" />
      </div>
      <div className={styles.row}>
        <label htmlFor="longitude">Longitude</label>
        <input type="text" id="longitude" />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Submit</Button>
        <Button type="secondary">Cancel</Button>
      </div>
    </form>
  );
}

export default Form;
