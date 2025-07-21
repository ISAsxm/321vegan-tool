import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1rem;
    padding: 0.3rem 0.6rem;
  `,
  medium: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
  `,
  large: css`
    font-size: 1.4rem;
    padding: 0.6rem 1rem;
  `,
};

const selectedCheckmark = css`
  &::after {
    content: "✓";
    position: absolute;
    top: -4px;
    right: -4px;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: var(--shadow-sm);
    color: var(--color-brand-50);
    background-color: var(--color-brand-700);
    border: 2px solid var(--color-brand-600);
  }
`;

const ColoredButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  color: var(--color-${(props) => props.color}-100);
  background-color: var(--color-${(props) => props.color}-700);

  &:hover {
    color: var(--color-${(props) => props.color}-700);
    background-color: var(--color-${(props) => props.color}-100);
  }

  ${(props) =>
    props.color &&
    ["silver", "grey"].includes(props.color) &&
    css`
      border: 0.5px solid var(--color-${props.color}-700);
    `}

  ${(props) => sizes[props.$size || "medium"]}
  ${(props) => props.$isSelected && selectedCheckmark}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export default ColoredButton;
