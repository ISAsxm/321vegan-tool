import Select from "@/ui/Select";
import { getValidSearchEngine, SEARCH_ENGINES } from "./searchEngineConfig";

import styled from "styled-components";

const StyledSearchEngineSelect = styled.div`
  width: 6.4rem;

  & > div {
    height: 100%;
    color: var(--color-brand-10);
    background-color: var(--color-brand-600);
    border: none;
    border-left: 1px solid var(--color-brand-700);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: none;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  [role="listbox"] {
    height: 100%;
    grid-template-columns: 1fr 1.6rem;
    gap: 0.4rem;
    padding: 1.2rem 0.8rem;
  }

  [role="listbox"] > svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-brand-10);
  }

  & > div > div:not([role="listbox"]) {
    width: 12rem;
    right: 0;
    left: auto;
  }
`;

const SearchEngineLogo = styled.img`
  display: block;
  width: 100%;
  max-width: 2.8rem;
  height: 1.8rem;
  object-fit: contain;
`;

const SearchEngineLogoLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SEARCH_ENGINE_OPTIONS = SEARCH_ENGINES.map(
  ({ value, label, logoSrc }) => ({
    value,
    label: (
      <SearchEngineLogoLabel>
        <SearchEngineLogo src={logoSrc} alt="" />
        <VisuallyHidden>{label}</VisuallyHidden>
      </SearchEngineLogoLabel>
    ),
  }),
);

function SearchEngineSelect({ value, onChange }) {
  function handleChange(searchEngine) {
    onChange(getValidSearchEngine(searchEngine));
  }

  return (
    <StyledSearchEngineSelect>
      <Select
        name="search-engine"
        defaultOptions={SEARCH_ENGINE_OPTIONS}
        defaultValue={[value]}
        onChange={handleChange}
        align="right"
      />
    </StyledSearchEngineSelect>
  );
}

export default SearchEngineSelect;
