import { useSearchParams } from "react-router-dom";

import { PAGE_SIZE } from "@/utils/constants";

import Select from "@/ui/Select";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const currentPageSize = !searchParams.get("size")
    ? PAGE_SIZE
    : Number(searchParams.get("size"));

  const pageCount = Math.ceil(count / currentPageSize);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function handlePageSize(value) {
    searchParams.set("size", value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <Paragraph>
        Affichage de <span>{(currentPage - 1) * currentPageSize + 1}</span> à{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * currentPageSize}
        </span>{" "}
        de <span>{count}</span> résultats
      </Paragraph>

      <Buttons>
        <Select
          onChange={handlePageSize}
          name="pageSizeSelect"
          defaultOptions={[5, 10, 20, 30, 50].reduce((acc, o) => {
            acc.push({ value: o, label: o });
            return acc;
          }, [])}
          defaultValue={[currentPageSize]}
        />
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Préc.</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Suiv.</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
