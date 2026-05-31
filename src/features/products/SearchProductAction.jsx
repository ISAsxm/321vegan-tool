import { useEffect } from "react";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";

import Button from "@/ui/Button";
import Select from "@/ui/Select";

import { HiMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";

const SEARCH_ENGINES = [
  {
    value: "google",
    label: "Google",
    buildUrl: (query) => `https://www.google.com/search?q=${query}`,
  },
  {
    value: "qwant",
    label: "Qwant",
    buildUrl: (query) => `https://www.qwant.com/?q=${query}`,
  },
  {
    value: "ecosia",
    label: "Ecosia",
    buildUrl: (query) => `https://www.ecosia.org/search?q=${query}`,
  },
  {
    value: "duckduckgo",
    label: "DuckDuckGo",
    buildUrl: (query) => `https://duckduckgo.com/?q=${query}`,
  },
];

const DEFAULT_SEARCH_ENGINE = "google";
const SEARCH_ENGINE_STORAGE_KEY = "product-register-search-engine-v2";

const SearchAction = styled.div`
  display: flex;
  align-items: stretch;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  & > a {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none;
  }
`;

const SearchEngineSelect = styled.div`
  flex: 0 0 auto;
  width: fit-content;
  min-width: 11.2rem;

  & > div {
    width: fit-content;
    min-width: 100%;
    height: 100%;
    border-left: 1px solid var(--color-brand-700);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: none;
  }

  [role="listbox"] {
    height: 100%;
    grid-template-columns: max-content 1.6rem;
    gap: 0.8rem;
    padding: 1.2rem 1.6rem;
  }

  [role="listbox"] > svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-brand-10);
  }

  & > div > div:not([role="listbox"]) {
    width: max-content;
    min-width: 100%;
    right: 0;
    left: auto;
  }
`;

const SEARCH_ENGINE_OPTIONS = SEARCH_ENGINES.map(({ value, label }) => ({
  value,
  label,
}));

function isValidSearchEngine(engine) {
  return SEARCH_ENGINES.some(({ value }) => value === engine);
}

function getValidSearchEngine(searchEngine) {
  return isValidSearchEngine(searchEngine)
    ? searchEngine
    : DEFAULT_SEARCH_ENGINE;
}

function getSearchEngine(searchEngine) {
  return (
    SEARCH_ENGINES.find((engine) => engine.value === searchEngine) ||
    SEARCH_ENGINES[0]
  );
}

function SearchProductAction({ ean }) {
  const [selectedSearchEngine, setSelectedSearchEngine] = useLocalStorageState(
    DEFAULT_SEARCH_ENGINE,
    SEARCH_ENGINE_STORAGE_KEY,
  );
  const validSearchEngine = getValidSearchEngine(selectedSearchEngine);
  const searchEngine = getSearchEngine(validSearchEngine);
  const searchQuery = encodeURIComponent(ean);

  useEffect(() => {
    if (validSearchEngine !== selectedSearchEngine) {
      setSelectedSearchEngine(validSearchEngine);
    }
  }, [selectedSearchEngine, setSelectedSearchEngine, validSearchEngine]);

  function handleSearchEngineChange(searchEngine) {
    setSelectedSearchEngine(getValidSearchEngine(searchEngine));
  }

  return (
    <SearchAction>
      <Button
        as="a"
        href={searchEngine.buildUrl(searchQuery)}
        target="_blank"
        rel="noreferrer"
      >
        <HiMagnifyingGlass />
        Rechercher sur
      </Button>

      <SearchEngineSelect>
        <Select
          name="search-engine"
          defaultOptions={SEARCH_ENGINE_OPTIONS}
          defaultValue={[validSearchEngine]}
          onChange={handleSearchEngineChange}
          align="right"
          variation="brand"
        />
      </SearchEngineSelect>
    </SearchAction>
  );
}

export default SearchProductAction;
