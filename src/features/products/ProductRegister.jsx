import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isToday } from "date-fns";

import { PRODUCT_STATUSES, S3_STORAGE_URL } from "@/utils/constants";
import { formatDate } from "@/utils/helpers";
import { useGoBack } from "@/hooks/useGoBack";
import { getBrandLookalike } from "@/services/apiBrands";
import { getProductData } from "@/services/apiOpenFoodFacts";
import { useProductByEan } from "./useProductByEan";
import googleLogo from "@/assets/engine_logos/Google_logo.png";
import qwantLogo from "@/assets/engine_logos/Qwant_logo.png";
import ecosiaLogo from "@/assets/engine_logos/Ecosia_logo.png";
import duckDuckGoLogo from "@/assets/engine_logos/DuckDuckGo_logo.png";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import HeaderDetail from "@/ui/HeaderDetail";
import Section from "@/ui/Section";
import DataBox from "@/ui/DataBox";
import ButtonText from "@/ui/ButtonText";
import Button from "@/ui/Button";
import Tag from "@/ui/Tag";
import DataItem from "@/ui/DataItem";
import NoDataItem from "@/ui/NoDataItem";
import HelpAction from "@/ui/HelpAction";
import Spinner from "@/ui/Spinner";
import ImageZoom from "@/ui/ImageZoom";
import Select from "@/ui/Select";

import IsItVeganHelper from "./IsItVeganHelper";
import OffDataBox from "./OffDataBox";
import RegisterProductForm from "./RegisterProductForm";
import RegisterProductAdmonition from "./RegisterProductAdmonition";

import { PiPlant } from "react-icons/pi";
import {
  HiMiniQrCode,
  HiOutlineInformationCircle,
  HiMagnifyingGlass,
  HiPhoto,
} from "react-icons/hi2";
import styled from "styled-components";

const HelperBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const SearchAction = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.6rem;
`;

const SearchEngineSelect = styled.div`
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

// to move if we ever use it somewhere else at some point
const SEARCH_ENGINES = [
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

const DEFAULT_SEARCH_ENGINE = "google";
const SEARCH_ENGINE_STORAGE_KEY = "product-register-search-engine";
const isValidSearchEngine = (engine) =>
  SEARCH_ENGINES.some(({ value }) => value === engine);

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

function ProductRegister({ ean, onClose, defaultState }) {
  const { productEan } = useParams();
  const finalEan = ean || productEan;
  const { isPending, product } = useProductByEan(finalEan);
  const [isPendingOff, setIsPendingOff] = useState(false);
  const [errorOff, setErrorOff] = useState("");
  const [offProduct, setOffProduct] = useState({});
  const [brandFromApi, setBrandFromApi] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedSearchEngine, setSelectedSearchEngine] = useState(() => {
    const storedSearchEngine = localStorage.getItem(SEARCH_ENGINE_STORAGE_KEY);
    return isValidSearchEngine(storedSearchEngine)
      ? storedSearchEngine
      : DEFAULT_SEARCH_ENGINE;
  });
  const goBack = useGoBack();
  const handleClose = onClose || goBack;

  function handleSearchEngineChange(searchEngine) {
    const nextSearchEngine = isValidSearchEngine(searchEngine)
      ? searchEngine
      : DEFAULT_SEARCH_ENGINE;

    setSelectedSearchEngine(nextSearchEngine);
    localStorage.setItem(SEARCH_ENGINE_STORAGE_KEY, nextSearchEngine);
  }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsPendingOff(true);
        const data = await getProductData(finalEan);
        if (data) setOffProduct(data);
        // Fetch brand from API
        const brand =
          data?.brands?.split(",")[0] ||
          data?.product_name?.split(" - ")[1] ||
          "";
        if (brand) {
          const matchingBrand = await getBrandLookalike(brand);
          if (matchingBrand)
            setBrandFromApi({
              id: matchingBrand.id,
              name: matchingBrand.name,
              background: matchingBrand.background,
            });
        }
      } catch (error) {
        console.error(error);
        setErrorOff(`Ean ${finalEan} inconnu dans Open Food Facts`);
      } finally {
        setIsPendingOff(false);
      }
    };
    fetchProductData();
  }, [finalEan]);

  // Check if the product has been verified while we are on validator mode
  // Because we fetched the products at the start of the session
  const isAlreadyVerified =
    !isPending && product && product.state !== "CREATED" && onClose;
  useEffect(() => {
    if (isAlreadyVerified) onClose();
  }, [isAlreadyVerified, onClose]);

  if (isPending || isPendingOff || isAlreadyVerified) return <Spinner />;

  const { created_at, name, status, state, image } = product;

  const {
    brands,
    product_name,
    image_url,
    ingredients_text: ingredients,
    additives_tags: additives,
  } = offProduct || {};

  const offBrandName = brands || product_name?.split(" - ")[1] || "";
  const searchEngine =
    SEARCH_ENGINES.find((engine) => engine.value === selectedSearchEngine) ||
    SEARCH_ENGINES[0];
  const searchQuery = encodeURIComponent(finalEan);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Vérification du produit #{finalEan}</Heading>
        {!onClose && <ButtonText onClick={goBack}>&larr; Retour</ButtonText>}
      </Row>

      <DataBox>
        <HeaderDetail type={PRODUCT_STATUSES[status].color}>
          <div>
            <PiPlant />
            <p>
              Ean <span>{finalEan}</span>
            </p>
          </div>

          <p>
            Ajouté le :
            {isToday(new Date(created_at))
              ? " Aujourd'hui"
              : formatDate(created_at, " dd/MM/yyyy")}
          </p>
        </HeaderDetail>

        <Section>
          <Row type="horizontal">
            <DataItem
              icon={<HiMiniQrCode />}
              label={`Produit ${
                state === "PUBLISHED" ? "validé" : "signalé"
              } comme`}
              type="horizontal"
            >
              <Tag type={PRODUCT_STATUSES[status].color}>
                {PRODUCT_STATUSES[status].label}
              </Tag>
            </DataItem>

            <HelperBox>
              <SearchAction>
                <Button
                  as="a"
                  href={searchEngine.buildUrl(searchQuery)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <HiMagnifyingGlass />
                  Rechercher sur {searchEngine.label}
                </Button>

                <SearchEngineSelect>
                  <Select
                    name="search-engine"
                    defaultOptions={SEARCH_ENGINE_OPTIONS}
                    defaultValue={[selectedSearchEngine]}
                    onChange={handleSearchEngineChange}
                    align="right"
                  />
                </SearchEngineSelect>
              </SearchAction>

              <HelpAction id="product-register-helper" variante="btn">
                <IsItVeganHelper />
              </HelpAction>
            </HelperBox>
          </Row>
        </Section>

        <Section>
          <DataItem
            icon={<HiPhoto />}
            label="Photo fournie"
            type={image ? "vertical" : "horizontal"}
          >
            {image ? (
              <ImageZoom
                src={`${S3_STORAGE_URL}/${image}`}
                height={30}
                width={60}
              />
            ) : (
              <NoDataItem>--</NoDataItem>
            )}
          </DataItem>
        </Section>

        <Section>
          <DataItem
            icon={<HiOutlineInformationCircle />}
            label="Informations OpenFoodFacts"
          >
            {errorOff ? (
              errorOff
            ) : (
              <OffDataBox
                imageSrc={image_url}
                ingredients={ingredients}
                productName={product_name}
                additives={additives}
                brandName={offBrandName}
              />
            )}
          </DataItem>
        </Section>

        <Section>
          <RegisterProductAdmonition brand={selectedBrand} />
        </Section>

        <Section>
          <RegisterProductForm
            productToCheckedIn={{
              ...product,
              ...(defaultState && { state: defaultState }),
              name: name || product_name,
              brand: brandFromApi || product.brand,
              brandName: offBrandName.split(",")[0],
            }}
            onClose={handleClose}
            onSelectBrand={setSelectedBrand}
          />
        </Section>
      </DataBox>
    </>
  );
}

export default ProductRegister;
