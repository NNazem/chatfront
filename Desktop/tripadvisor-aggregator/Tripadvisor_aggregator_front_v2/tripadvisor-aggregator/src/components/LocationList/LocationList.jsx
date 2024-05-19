import { useState } from "react";
import Location from "../Location/Location";
import styles from "./LocationList.module.css";

const Locations = [
  {
    id: 1,
    name: "Test Location 1",
    distance: "1.234",
    bearing: "southwest",
    address_obj: {
      street1: "123 Test Street",
      city: "Test City",
      state: "Test State",
      country: "Test Country",
      postalcode: "12345",
      address_string:
        "123 Test Street, Test City, Test State, Test Country, 12345",
    },
  },
  {
    id: 2,
    name: "Test Location 2",
    distance: "5.678",
    bearing: "north",
    address_obj: {
      street1: "456 Test Street",
      city: "Test City",
      state: "Test State",
      country: "Test Country",
      postalcode: "54321",
      address_string:
        "456 Test Street, Test City, Test State, Test Country, 54321",
    },
  },
  {
    id: 3,
    name: "Test Location 2",
    distance: "5.678",
    bearing: "north",
    address_obj: {
      street1: "456 Test Street",
      city: "Test City",
      state: "Test State",
      country: "Test Country",
      postalcode: "54321",
      address_string:
        "456 Test Street, Test City, Test State, Test Country, 54321",
    },
  },
];

function LocationList() {
  const [locations, setLocations] = useState(Locations);
  return (
    <table className={styles.locationList}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Distanza</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <Location key={location.id} location={location} />
        ))}
      </tbody>
    </table>
  );
}

export default LocationList;
