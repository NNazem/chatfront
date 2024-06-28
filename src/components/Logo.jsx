import React, { useEffect } from "react";
import styles from "./Logo.module.css";

function Logo({ nickName }) {
  const initials =
    nickName && typeof nickName === "string"
      ? nickName.substring(0, 2).toUpperCase()
      : "";
  return <div className={styles.logo}>{initials}</div>;
}

export default Logo;
