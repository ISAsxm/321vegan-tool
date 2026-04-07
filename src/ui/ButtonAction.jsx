import styled, { css } from "styled-components";

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

const ButtonAction = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: inherit;
    transition: all 0.3s;
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    &:hover {
      background-color: var(--color-grey-200);
    }
  }
  ${(props) => variations[props.$variation || "danger"]}
`;

export default ButtonAction;
