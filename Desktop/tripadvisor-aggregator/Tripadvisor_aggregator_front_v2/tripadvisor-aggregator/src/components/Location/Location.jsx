import styles from "./Location.module.css";

function Location({ location }) {
  return (
    <tr className={styles.location}>
      <td>{location.name}</td>
      <td>{location.distance} miles</td>
    </tr>
  );
}

export default Location;
