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

const getColorStyles = (color, isSelected) => {
  const state = isSelected ? 'selected' : 'unselected';
  
  return css`
    color: var(--button-${color}-${state}-color);
    background-color: var(--button-${color}-${state}-bg);
    border: ${isSelected ? '2px' : '1px'} solid var(--button-${color}-${state}-border);
    
    ${isSelected && css`
      box-shadow: var(--button-${color}-${state}-shadow), 0 0 0 2px rgba(var(--color-${color}-700-rgb), 0.2);
      font-weight: 700;
      transform: translateY(-1px);
    `}
    
    &:hover {
      background-color: var(--button-${color}-${state}-hover);
      ${!isSelected && css`transform: translateY(-1px);`}
    }
  `;
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

  ${(props) => sizes[props.$size || "medium"]}
  ${(props) => getColorStyles(props.$color, props.$isSelected)}
  ${(props) => props.$isSelected && selectedCheckmark}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export default ColoredButton;
