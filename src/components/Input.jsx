import styles from "./Input.module.css";

function Input({
  type = "text",
  className = "input-message",
  placeholder = "Write a message...",
  value,
  onChange,
  required = true,
  pattern = ".*",
  title = "",
  name,
}) {
  return (
    <input
      type={type}
      className={styles[className]}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={onChange}
      pattern={pattern}
      title={title}
      name={name}
    />
  );
}

export default Input;
