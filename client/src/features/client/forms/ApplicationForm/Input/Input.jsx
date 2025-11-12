import style from "./Input.module.css";

const Input = ({
  type = "text",
  placeholder,
  options = [],
  value = "",
  onChange,
  name,
  error = "",
}) => {
  const handleChange = (e) => {
    onChange(e, name);
  };

  return (
    <div
      className={`${style.inputGroup} ${
        type === "select" ? style.selectGroup : ""
      } ${error ? style.inputGroupError : ""}`}
    >
      {type === "select" ? (
        <select
          className={`${style.input} ${error ? style.inputError : ""}`}
          value={value}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={`${style.input} ${error ? style.inputError : ""}`}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          minLength={type === "text" ? 2 : undefined}
          maxLength={128}
        />
      )}
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};

export default Input;
