import Button from "./Button";
import Input from "./Input";
import styles from "./Login.module.css";

function Login({ user, setUser, handleConnect, handleSignup }) {
  function handleChangeNickname(e) {
    setUser({ ...user, nickName: e.target.value });
  }

  function handleChangePassword(e) {
    setUser({ ...user, password: e.target.value });
  }

  return (
    <div className={styles.signin}>
      <div className={styles.content}>
        <h2>Sign in</h2>
        <div className={styles.form}>
          <div className={styles.inputBox}>
            <Input
              className="primary"
              placeholder="Enter your username..."
              value={user.nickName}
              onChange={handleChangeNickname}
            />
          </div>
          <div className={styles.inputBox}>
            <Input
              className="primary"
              placeholder="Enter your password..."
              type="password"
              value={user.password}
              onChange={handleChangePassword}
            />
          </div>
          <div className={styles.links}>
            <a href="#">Forgot password?</a>
            <a href="#" onClick={handleSignup}>
              Sign up
            </a>
          </div>
          <div className={styles.inputBox}>
            <Button type="primary" onClick={handleConnect}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
