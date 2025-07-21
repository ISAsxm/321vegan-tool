import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.0rem;
    padding: 0.3rem 0.6rem;
  `,
  medium: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
  `,
  large: css`
    font-size: 1.4rem;
    padding: 0.6rem 1.0rem;
  `,
};

const selectedCheckmark = css`
  &::after {
    content: '✓';
    position: absolute;
    top: -4px;
    right: -4px;
    background-color: var(--color-brand-600);
    color: var(--color-grey-0);
    border-radius: 50%;
    width: 16px;
    height: 16px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 2px solid var(--color-grey-0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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

  color: var(--button-${(props) => props.$color}-unselected-color);
  background-color: var(--button-${(props) => props.$color}-unselected-bg);
  border: 1px solid var(--button-${(props) => props.$color}-unselected-border);
  
  &:hover {
    background-color: var(--button-${(props) => props.$color}-unselected-hover);
  }

  ${(props) => sizes[props.$size || "medium"]}
  ${(props) => props.$isSelected && selectedCheckmark}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export default ColoredButton;
