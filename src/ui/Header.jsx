import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import HeaderMenu from "./HeaderMenu";

import UserAvatar from "@/features/authentication/UserAvatar";
import UserStats from "@/features/authentication/UserStats";

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

function Header() {
  const { currentUser } = useCurrentUserContext();
  return (
    <StyledHeader>
      <UserStats user={currentUser} />
      <UserAvatar user={currentUser} />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
