import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  &::placeholder {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-grey-300);
  }
`;

export default Input;
