import styled from 'styled-components';

const StyledInputWithLabel = styled.div`
  display: inline-flex;
  flex:1;
  gap: 0.5rem;
  align-items: center;
  margin-right: 0.5rem;
  input{flex:1;}

`;

function TextInputWithLabel({ elementId, label, onChange, ref, value, type }) {
  return (
    <StyledInputWithLabel>
      <label htmlFor={elementId}>{label}</label>
      <input
        type={type}
        ref={ref}
        id={elementId}
        value={value}
        onChange={onChange}
      ></input>
    </StyledInputWithLabel>
  );
}

export default TextInputWithLabel;
