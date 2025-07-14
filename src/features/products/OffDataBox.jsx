import Highlighter from "react-highlight-words";

import { NON_VEGAN_INGREDIENTS, NON_VEGAN_E_NUMBERS } from "@/utils/constants";

import DataItem from "@/ui/DataItem";
import NoDataItem from "@/ui/NoDataItem";

import { MdOutlineImageNotSupported } from "react-icons/md";
import {
  HiOutlineBuildingOffice,
  HiOutlineListBullet,
  HiTag,
  HiOutlineBeaker,
} from "react-icons/hi2";

import styled, { css } from "styled-components";

const StyledOffDataBox = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const OffImgFallbackBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-300);
  color: var(--color-grey-500);

  & svg {
    width: 90%;
    height: 90%;
  }

  ${(props) =>
    props.$src &&
    css`
      background-image: url(${props.$src});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    `}
`;

const OffDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function OffDataBox({ imageSrc, ingredients, additives, brandName, productName }) {
  return (
    <StyledOffDataBox>
      <OffImgFallbackBox $src={imageSrc}>
        {!imageSrc && <MdOutlineImageNotSupported />}
      </OffImgFallbackBox>

      <OffDescriptionBox>
        <DataItem
          icon={<HiOutlineBuildingOffice />}
          label="Marque"
          type="horizontal"
        >
          {brandName || <NoDataItem>Non disponible</NoDataItem>}
        </DataItem>

        <DataItem
          icon={< HiTag/>}
          label="Nom"
          type="horizontal"
        >
          {productName || <NoDataItem>Non disponible</NoDataItem>}
        </DataItem>

        <DataItem
          icon={<HiOutlineListBullet />}
          label="Ingredients"
          type="horizontal"
        >
          {ingredients ? (
            <Highlighter
              highlightClassName="highlightClass"
              searchWords={NON_VEGAN_INGREDIENTS}
              autoEscape={true}
              textToHighlight={ingredients}
            />
          ) : (
            <NoDataItem>Non disponible</NoDataItem>
          )}
        </DataItem>

        <DataItem icon={<HiOutlineBeaker />} label="Additifs" type="horizontal">
          {additives ? (
            <Highlighter
              highlightClassName="highlightClass"
              searchWords={NON_VEGAN_E_NUMBERS}
              autoEscape={true}
              textToHighlight={additives.map((a) => a.split(":")[1]).join(", ")}
            />
          ) : (
            <NoDataItem>Non disponible</NoDataItem>
          )}
        </DataItem>
      </OffDescriptionBox>
    </StyledOffDataBox>
  );
}

export default OffDataBox;
