// Props destructuring
export default function Input({
  htmlFor,
  text,
  type,
  id,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="inputArea">
      <label htmlFor={htmlFor}>{text}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
