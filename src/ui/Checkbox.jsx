import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  height: 2.4rem;
  width: 2.4rem;
  outline-offset: 2px;
  transform-origin: 0;
  accent-color: var(--color-brand-600);

  appearance: none;
  background-color: var(--color-grey-0);
  margin: 0;
  font: inherit;
  color: var(--color-brand-600);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  display: grid;
  place-content: center;

  &:checked {
    background-color: var(--color-brand-600);
  }

  &::before {
    content: "";
    height: 1.6rem;
    width: 1.6rem;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    box-shadow: inset 1em 1em var(--color-grey-0);
    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:disabled {
    accent-color: var(--color-brand-600);
  }
`;

const Label = styled.label`
  flex: 1;

  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

function Checkbox({
  name,
  onChange,
  checked = false,
  disabled = false,
  required = false,
  children,
  ...props
}) {
  return (
    <CheckboxWrapper>
      <StyledCheckbox
        id={name}
        name={name}
        onChange={onChange}
        checked={checked}
        required={required}
        disabled={disabled}
        {...props}
      />
      {children && <Label htmlFor={!disabled ? name : ""}>{children}</Label>}
    </CheckboxWrapper>
  );
}

export default Checkbox;
