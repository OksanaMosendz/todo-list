function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return;
  <>
    <label htmlFor={elementId}>{label}</label>
    <input
      type="text"
      ref={ref}
      id={elementId}
      value={value}
      onChange={onChange}
    ></input>
  </>;
}

export default TextInputWithLabel;
