import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isToday } from "date-fns";

import { PRODUCT_STATUSES } from "@/utils/constants";
import { formatDate } from "@/utils/helpers";
import { useGoBack } from "@/hooks/useGoBack";
import { getBrandLookalike } from "@/services/apiBrands";
import { getProductData } from "@/services/apiOpenFoodFacts";
import { useProductByEan } from "./useProductByEan";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import HeaderDetail from "@/ui/HeaderDetail";
import Section from "@/ui/Section";
import DataBox from "@/ui/DataBox";
import ButtonText from "@/ui/ButtonText";
import Button from "@/ui/Button";
import Tag from "@/ui/Tag";
import DataItem from "@/ui/DataItem";
import HelpAction from "@/ui/HelpAction";
import Spinner from "@/ui/Spinner";

import IsItVeganHelper from "./IsItVeganHelper";
import OffDataBox from "./OffDataBox";
import RegisterProductForm from "./RegisterProductForm";
import RegisterProductAdmonition from "./RegisterProductAdmonition";

import { PiPlant } from "react-icons/pi";
import {
  HiMiniQrCode,
  HiOutlineInformationCircle,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import styled from "styled-components";

const HelperBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function ProductRegister() {
  const { productEan } = useParams();
  const { isPending, product } = useProductByEan(productEan);
  const [isPendingOff, setIsPendingOff] = useState(false);
  const [errorOff, setErrorOff] = useState("");
  const [offProduct, setOffProduct] = useState({});
  const [brandFromApi, setBrandFromApi] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState();
  const goBack = useGoBack();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsPendingOff(true);
        const data = await getProductData(productEan);
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
        setErrorOff(`Ean ${productEan} inconnu dans Open Food Facts`);
      } finally {
        setIsPendingOff(false);
      }
    };
    fetchProductData();
  }, [productEan]);

  if (isPending || isPendingOff) return <Spinner />;

  const { created_at, ean, name, status, state } = product;

  const {
    brands,
    product_name,
    image_url,
    ingredients_text: ingredients,
    additives_tags: additives,
  } = offProduct || {};

  const offBrandName = brands || product_name?.split(" - ")[1] || "";

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Vérification du produit #{productEan}</Heading>
        <ButtonText onClick={goBack}>&larr; Retour</ButtonText>
      </Row>

      <DataBox>
        <HeaderDetail type={PRODUCT_STATUSES[status].color}>
          <div>
            <PiPlant />
            <p>
              Ean <span>{ean}</span>
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
              <Button
                as="a"
                href={`http://www.google.com/search?q=${ean}`}
                target="_blank"
                rel="noreferrer"
              >
                <HiMagnifyingGlass />
                Rechercher sur Google
              </Button>

              <HelpAction id="product-register-helper" variante="btn">
                <IsItVeganHelper />
              </HelpAction>
            </HelperBox>
          </Row>
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
              name: name || product_name,
              brand: brandFromApi || product.brand,
              brandName: offBrandName.split(",")[0],
            }}
            onClose={goBack}
            onSelectBrand={setSelectedBrand}
          />
        </Section>
      </DataBox>
    </>
  );
}

export default ProductRegister;
