import { NavLink } from "react-router-dom";

import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import {
  HiOutlineBeaker,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineBuildingOffice,
  HiMiniGlobeAlt,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { PiHandSoap, PiPlant } from "react-icons/pi";

import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { isPending, user } = useCurrentUser();

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/products">
            <PiPlant />
            <span>Produits</span>
          </StyledNavLink>
        </li>
        {!isPending && user.roles.includes("contributor") && (
          <li>
            <StyledNavLink to="/error-reports">
              <HiOutlineExclamationTriangle />
              <span>Erreurs signalées</span>
            </StyledNavLink>
          </li>
        )}
        <li>
          <StyledNavLink to="/additives">
            <HiOutlineBeaker />
            <span>Additifs</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/cosmetics">
            <PiHandSoap />
            <span>Cosmétiques</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/brands">
            <HiOutlineBuildingOffice />
            <span>Marques</span>
          </StyledNavLink>
        </li>
        {!isPending && user.role === "admin" && (
          <>
            <li>
              <StyledNavLink to="/users">
                <HiOutlineUsers />
                <span>Utilisateurices</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/clients">
                <HiMiniGlobeAlt />
                <span>Clients API</span>
              </StyledNavLink>
            </li>
          </>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
