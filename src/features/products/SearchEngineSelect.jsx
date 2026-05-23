import Select from "@/ui/Select";
import { getValidSearchEngine, SEARCH_ENGINES } from "./searchEngineConfig";

import styled from "styled-components";

const StyledSearchEngineSelect = styled.div`
  width: 9rem;

  [role="listbox"] {
    gap: 0.6rem;
  }
`;

const SearchEngineLogo = styled.img`
  display: block;
  width: 100%;
  max-width: 4rem;
  height: 2rem;
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
