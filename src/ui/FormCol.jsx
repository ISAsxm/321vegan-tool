import styled from "styled-components";

const StyledFormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;

  &:has(input[required]) label::after,
  &:has(select[required]) label::after,
  &:has(textarea[required]) label::after,
  &:has(.required) label::after {
    content: "*";
    color: var(--color-red-700);
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Hint = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-grey-500);
  padding-top: 0.4rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormCol({ label, hint, error, children }) {
  return (
    <StyledFormCol>
      {label && (
        <div>
          <Label htmlFor={children.props.id}>{label}</Label>
          {hint && <Hint>{hint}</Hint>}
        </div>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormCol>
  );
}

export default FormCol;
