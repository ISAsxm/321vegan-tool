import {
  HiOutlineExclamationTriangle,
  HiOutlineExclamationCircle,
  HiOutlineFire,
  HiOutlineQuestionMarkCircle,
  HiOutlineLightBulb,
} from "react-icons/hi2";
import styled, { css } from "styled-components";

const icons = {
  warning: <HiOutlineExclamationTriangle />,
  accent: <HiOutlineExclamationCircle />,
  fire: <HiOutlineFire />,
  help: <HiOutlineQuestionMarkCircle />,
  hint: <HiOutlineLightBulb />,
};

const variations = {
  primary: css`
    background-color: var(--color-brand-10);
    border-color: var(--color-brand-800);
    color: var(--color-brand-800);
  `,
  secondary: css`
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-800);
    color: var(--color-grey-800);
  `,
  accent: css`
    background-color: var(--color-orange-100);
    border-color: var(--color-orange-800);
    color: var(--color-orange-800);
  `,
  danger: css`
    background-color: var(--color-red-100);
    border-color: var(--color-red-800);
    color: var(--color-red-800);
  `,
  info: css`
    background-color: var(--color-indigo-100);
    border-color: var(--color-indigo-800);
    color: var(--color-indigo-800);
  `,
  warning: css`
    background-color: var(--color-yellow-100);
    border-color: var(--color-yellow-800);
    color: var(--color-yellow-800);
  `,
};

const StyledAdmonition = styled.div`
  border-radius: 0.125rem;
  border-left-style: solid;
  padding: 1rem;
  ${(props) => variations[props.$variation]}
`;

const AdmonitionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AdmonitionIcon = styled.div`
  flex-shrink: 0;
  align-self: flex-start;
  display: flex;
  align-items: center;
  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

function Admonition({ children, variation = "warning", icon = "warning" }) {
  return (
    <StyledAdmonition $variation={variation}>
      <AdmonitionContainer>
        <AdmonitionIcon>{icons[icon]}</AdmonitionIcon>
        <div>{children}</div>
      </AdmonitionContainer>
    </StyledAdmonition>
  );
}

export default Admonition;
