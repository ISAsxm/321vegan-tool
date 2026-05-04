import { NavLink } from "react-router-dom";
import { HiOutlineTrophy } from "react-icons/hi2";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-500);
  transition: color 0.3s;

  &:hover,
  &.active {
    color: var(--color-brand-600);
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

function LeaderboardLink() {
  return (
    <StyledLink to="/leaderboard">
      <HiOutlineTrophy />
      <span>Leaderboard</span>
    </StyledLink>
  );
}

export default LeaderboardLink;
