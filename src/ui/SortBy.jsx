import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi";

import styled, { css } from "styled-components";

const StyledSort = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    color: var(--color-grey-700);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-grey-100);
      & svg {
        color: var(--color-brand-600);
      }
    `}
`;

const SortByContext = createContext();

function SortBy({ children }) {
  const [activeId, setActiveId] = useState("");
  const [order, setOrder] = useState(null);

  const activate = setActiveId;
  const deactivate = () => setActiveId("");

  return (
    <SortByContext
      value={{
        activeId,
        activate,
        deactivate,
        order,
        setOrder,
      }}
    >
      {children}
    </SortByContext>
  );
}

function Sort({ sortByField }) {
  const { activeId, activate, deactivate, order, setOrder } =
    useContext(SortByContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByValue = searchParams.get("sortBy") || null;
  const isActive = activeId === sortByField;

  function handleClick() {
    const newOrder =
      order === null || !isActive ? "asc" : order === "asc" ? "desc" : null;
    setOrder(newOrder);
    if (newOrder) {
      searchParams.set("sortBy", `${sortByField}-${newOrder}`);
      if (!isActive) activate(sortByField);
    } else {
      if (sortByValue) searchParams.delete("sortBy");
      deactivate();
    }
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledSort onClick={handleClick} $active={isActive ? 1 : 0}>
      {!isActive && <BiSortAlt2 />}
      {isActive && order?.includes("asc") && <BiSortUp />}
      {isActive && order?.endsWith("desc") && <BiSortDown />}
    </StyledSort>
  );
}

SortBy.Sort = Sort;
export default SortBy;
