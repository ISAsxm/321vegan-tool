import googleLogo from "@/assets/engine_logos/Google_logo.png";
import qwantLogo from "@/assets/engine_logos/Qwant_logo.png";
import ecosiaLogo from "@/assets/engine_logos/Ecosia_logo.png";
import duckDuckGoLogo from "@/assets/engine_logos/DuckDuckGo_logo.png";

export const SEARCH_ENGINES = [
  {
    value: "google",
    label: "Google",
    logoSrc: googleLogo,
    buildUrl: (query) => `https://www.google.com/search?q=${query}`,
  },
  {
    value: "qwant",
    label: "Qwant",
    logoSrc: qwantLogo,
    buildUrl: (query) => `https://www.qwant.com/?q=${query}`,
  },
  {
    value: "ecosia",
    label: "Ecosia",
    logoSrc: ecosiaLogo,
    buildUrl: (query) => `https://www.ecosia.org/search?q=${query}`,
  },
  {
    value: "duckduckgo",
    label: "DuckDuckGo",
    logoSrc: duckDuckGoLogo,
    buildUrl: (query) => `https://duckduckgo.com/?q=${query}`,
  },
];

export const DEFAULT_SEARCH_ENGINE = "google";
export const SEARCH_ENGINE_STORAGE_KEY = "product-register-search-engine";

function isValidSearchEngine(engine) {
  return SEARCH_ENGINES.some(({ value }) => value === engine);
}

export function getSearchEngine(searchEngine) {
  return (
    SEARCH_ENGINES.find((engine) => engine.value === searchEngine) ||
    SEARCH_ENGINES[0]
  );
}

export function getValidSearchEngine(searchEngine) {
  return isValidSearchEngine(searchEngine) ? searchEngine : DEFAULT_SEARCH_ENGINE;
}
