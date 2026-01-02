import { HiCheckBadge, HiOutlineEnvelope } from "react-icons/hi2";
import styled, { css } from "styled-components";

const types = {
  horizontal: css`
    gap: 2rem;
    align-items: center;
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  `,
  vertical: css`
    flex-direction: column;
    gap: 0.2rem;
  `,
};

const StyledUserStats = styled.div`
  display: flex;
  ${(props) => types[props.type || "horizontal"]}
  padding: 0.6rem 1.6rem;
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-brand-600);
  }

  span {
    color: var(--color-grey-700);
  }

  & span:first-child {
    font-weight: 600;
  }

  & span:last-child {
    font-weight: 400;
  }
`;

function UserStats({ user, type = "horizontal" }) {
  const productsModified = user?.nb_products_modified || 0;
  const contactsMade = user?.nb_checkings || 0;
  return (
    <StyledUserStats type={type}>
      <StatItem>
        <HiCheckBadge />
        <span>{productsModified}</span>
        <span>produit{productsModified > 1 ? "s" : ""}</span>
      </StatItem>
      <StatItem>
        <HiOutlineEnvelope />
        <span>{contactsMade}</span>
        <span>contact{contactsMade > 1 ? "s" : ""}</span>
      </StatItem>
    </StyledUserStats>
  );
}

export default UserStats;
