import { NavLink } from "react-router-dom";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import {
  HiOutlineBeaker,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineBuildingOffice,
  HiMiniGlobeAlt,
  HiOutlineExclamationTriangle,
  HiOutlineEnvelope,
  HiOutlineTrophy,
  HiOutlineRectangleGroup,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import { PiHandSoap, PiPlant } from "react-icons/pi";

import styled from "styled-components";
import { useState } from "react";

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

    & svg {
      color: var(--color-brand-600);
    }
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const NestedNavLink = styled(StyledNavLink)`
  &:link,
  &:visited {
    width: 100%;
    padding-left: 4rem;
  }
`;

const StyledNavSubItem = styled.span`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
    & svg {
      color: var(--color-brand-600);
    }
  }

  & svg {
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
  & svg:first-child {
    width: 2.4rem;
    height: 2.4rem;
  }
  & svg:last-child {
    margin-left: auto;
  }
`;

function MainNav() {
  const { hasAccess } = useCurrentUserContext();
  const [currentOpen, setCurrentOpen] = useState(null);

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
        {hasAccess("contributor") && (
          <NavSubItem
            currentOpen={currentOpen}
            onOpen={setCurrentOpen}
            id="checkings"
            icon={<HiOutlineCheckCircle />}
            title="Vérification"
          >
            <NavList>
              <li>
                <NestedNavLink to="/checkings">
                  <HiOutlineEnvelope /> <span>Contacts</span>
                </NestedNavLink>
              </li>
              <li>
                <NestedNavLink to="/error-reports">
                  <HiOutlineExclamationTriangle /> <span>Signalements</span>
                </NestedNavLink>
              </li>
            </NavList>
          </NavSubItem>
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
        {hasAccess("contributor") && (
          <NavSubItem
            currentOpen={currentOpen}
            onOpen={setCurrentOpen}
            id="scoring"
            icon={<HiOutlineTrophy />}
            title="Évaluation"
          >
            <NavList>
              <li>
                <NestedNavLink to="/scoring/categories">
                  <HiOutlineRectangleGroup /> <span>Catégories</span>
                </NestedNavLink>
              </li>
            </NavList>
          </NavSubItem>
        )}
        {hasAccess("admin") && (
          <NavSubItem
            currentOpen={currentOpen}
            onOpen={setCurrentOpen}
            id="security"
            icon={<HiOutlineShieldCheck />}
            title="Sécurité"
          >
            <NavList>
              <li>
                <NestedNavLink to="/users">
                  <HiOutlineUsers /> <span>Utilisateurices</span>
                </NestedNavLink>
              </li>
              <li>
                <NestedNavLink to="/clients">
                  <HiMiniGlobeAlt /> <span>Clients API</span>
                </NestedNavLink>
              </li>
            </NavList>
          </NavSubItem>
        )}
      </NavList>
    </nav>
  );
}

function NavSubItem({ currentOpen, onOpen, id, icon, title, children }) {
  const isOpen = id === currentOpen;
  function handleToggle() {
    onOpen(isOpen ? null : id);
  }
  return (
    <li>
      <StyledNavSubItem onClick={handleToggle}>
        {icon} <span>{title}</span>{" "}
        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
      </StyledNavSubItem>
      {isOpen && children}
    </li>
  );
}

export default MainNav;
