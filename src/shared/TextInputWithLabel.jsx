function TextInputWithLabel({elementId, label, onChange, ref, value, type }) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
        type={type}
        ref={ref}
        id={elementId}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}

export default TextInputWithLabel;
