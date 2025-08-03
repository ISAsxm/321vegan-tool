import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-10);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  accent: css`
    color: var(--color-orange-100);
    background-color: var(--color-orange-700);

    &:hover {
      background-color: var(--color-orange-800);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  warning: css`
    color: var(--color-yellow-100);
    background-color: var(--color-yellow-700);

    &:hover {
      background-color: var(--color-yellow-800);
    }
  `,
  confirm: css`
    color: var(--color-green-100);
    background-color: var(--color-green-700);

    &:hover {
      background-color: var(--color-green-800);
    }
  `,
  info: css`
    color: var(--color-indigo-100);
    background-color: var(--color-indigo-700);

    &:hover {
      background-color: var(--color-indigo-800);
    }
  `,
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) => sizes[props.$size || "medium"]}
  ${(props) => variations[props.$variation || "primary"]}

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default Button;
