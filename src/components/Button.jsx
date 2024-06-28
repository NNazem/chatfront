import styles from "./Button.module.css";

function Button({ type, children, onClick }) {
  return (
    <button type={type} onClick={onClick} className={`${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
