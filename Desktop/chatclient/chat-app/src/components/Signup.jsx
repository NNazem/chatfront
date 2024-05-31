import { useState } from "react";
import Button from "./Button"; // Ensure you have this component or remove this import if not used
import Input from "./Input";
import styles from "./Signup.module.css";
import { signUpUser } from "../api/websocket"; // Ensure you have this function or remove this import if not used

function Signup({ setSignup, handleSignup, user, setUser }) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await signUpUser({ ...user, status: "OFFLINE" });
      setSignup((prev) => !prev);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className={styles.signup}>
      <div className={styles.content}>
        <h2>Sign up</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <Input
              className="primary"
              placeholder="Enter your username..."
              required
              name="nickName"
              value={user.nickName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputBox}>
            <Input
              className="primary"
              placeholder="Enter your full name..."
              required
              name="fullName"
              value={user.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputBox}>
            <Input
              className="primary"
              type="password"
              placeholder="Enter your password..."
              required
              pattern=".{6,}"
              title="Password must be at least 6 characters long"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputBox}>
            <Input
              className="primary"
              type="password"
              placeholder="Confirm your password..."
              required
              pattern={user.password}
              title="Passwords must match"
              name="confirmPassword"
              value={user.confirmPassword}
            />
          </div>
          <div className={styles.inputBox}>
            <Input
              className="primary"
              type="email"
              placeholder="Enter your email..."
              required
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.links}>
            <a href="#">Forgot password?</a>
            <a href="#" onClick={handleSignup}>
              Sign in
            </a>
          </div>
          <div className={styles.inputBox}>
            <input
              type="submit"
              className={styles.submitButton}
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
