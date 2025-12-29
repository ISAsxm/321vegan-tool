import HeaderMenu from "./HeaderMenu";

import UserAvatar from "@/features/authentication/UserAvatar";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import { HiCheckBadge, HiOutlineEnvelope } from "react-icons/hi2";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const UserStats = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 0.6rem 1.6rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
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
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

function Header() {
  const { currentUser } = useCurrentUserContext();
  
  const productsModified = currentUser?.nb_products_modified || 0;
  const contactsMade = currentUser?.nb_checkings || 0;

  return (
    <StyledHeader>
      <UserStats>
        <StatItem>
          <HiCheckBadge />
          <span>{productsModified}</span>
          <span style={{ fontWeight: 400 }}>produit{productsModified > 1 ? 's' : ''}</span>
        </StatItem>
        <StatItem>
          <HiOutlineEnvelope />
          <span>{contactsMade}</span>
          <span style={{ fontWeight: 400 }}>contact{contactsMade > 1 ? 's' : ''}</span>
        </StatItem>
      </UserStats>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
