import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button:not([type="button"])):not(:has(select, input, textarea)) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

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

function FormRow({ label, hint, error, children }) {
  return (
    <StyledFormRow>
      {label && (
        <div>
          <Label htmlFor={children.props.id}>{label}</Label>
          {hint && <Hint>{hint}</Hint>}
        </div>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
