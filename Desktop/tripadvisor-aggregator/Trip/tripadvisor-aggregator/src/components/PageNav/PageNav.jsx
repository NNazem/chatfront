import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <NavLink to="/publish">
          <li>Publish</li>
        </NavLink>
        <NavLink to="/fetch">
          <li>Fetch</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default PageNav;
