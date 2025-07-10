import { isToday } from "date-fns";

import { useGoBack } from "@/hooks/useGoBack";
import { formatDate } from "@/utils/helpers";
import { PRODUCT_STATUSES } from "@/utils/constants";

import { useOffProduct } from "./useOffProduct";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import HeaderDetail from "@/ui/HeaderDetail";
import Section from "@/ui/Section";
import DataBox from "@/ui/DataBox";
import ButtonText from "@/ui/ButtonText";
import Button from "@/ui/Button";
import Tag from "@/ui/Tag";
import DataItem from "@/ui/DataItem";
import Spinner from "@/ui/Spinner";

import OffDataBox from "./OffDataBox";
import RegisterProductForm from "./RegisterProductForm";

import { PiPlant } from "react-icons/pi";
import {
  HiMiniQrCode,
  HiOutlineInformationCircle,
  HiMagnifyingGlass,
} from "react-icons/hi2";

function ProductRegister() {
  const { isLoading, product, isLoadingOff, offProduct } = useOffProduct();
  const goBack = useGoBack();

  if (isLoading || isLoadingOff) return <Spinner />;

  const {
    id: productId,
    created_at,
    ean,
    name,
    brand,
    status,
    state,
  } = product;

  const {
    brands,
    product_name,
    product_name_fr,
    image_url,
    ingredients_text: ingredients,
    additives_tags: additives,
  } = offProduct || {};

  const brandName =
    brand?.name || brands || product_name?.split(" - ")[1] || "";

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Vérification du produit #{productId}</Heading>
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
            <Button
              as="a"
              href={`http://www.google.com/search?q=${ean}`}
              target="_blank"
            >
              <HiMagnifyingGlass />
              Rechercher sur Google
            </Button>
          </Row>
        </Section>

        <Section>
          <DataItem
            icon={<HiOutlineInformationCircle />}
            label="Informations OpenFoodFacts"
          >
            <OffDataBox
              imageSrc={image_url}
              ingredients={ingredients}
              additives={additives}
              brandName={brandName}
            />
          </DataItem>
        </Section>

        <Section>
          <RegisterProductForm
            productToCheckedIn={{
              ...product,
              name: name || product_name_fr,
              brandName: brandName,
            }}
            onClose={goBack}
          />
        </Section>
      </DataBox>
    </>
  );
}

export default ProductRegister;
