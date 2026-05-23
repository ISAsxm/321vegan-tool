import { memo } from "react";

import {
  MAYBE_VEGAN_E_NUMBERS,
  MAYBE_VEGAN_INGREDIENTS,
  NON_VEGAN_E_NUMBERS,
  NON_VEGAN_INGREDIENTS,
} from "@/utils/constants";

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

  & div span:first-of-type {
    width: 12rem;
  }
`;

const TextContent = styled.span`
  flex: 1;
  min-width: 0;
  line-height: inherit;
`;

const Highlight = styled.mark`
  border-radius: var(--border-radius-tiny);
  background-color: ${(props) =>
    props.$variant === "non-vegan"
      ? "var(--color-red-100)"
      : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$variant === "non-vegan"
      ? "var(--color-red-800)"
      : "var(--color-yellow-800)"};
`;

const NON_VEGAN_SEARCH_WORDS = [
  ...NON_VEGAN_INGREDIENTS,
  ...NON_VEGAN_E_NUMBERS,
];

const MAYBE_VEGAN_SEARCH_WORDS = [
  ...MAYBE_VEGAN_INGREDIENTS,
  ...MAYBE_VEGAN_E_NUMBERS,
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// dynamic regex based on the vegan/maybe/not vegan ingredients in constants.js
function buildHighlightRegex(searchWords) {
  const escapedWords = searchWords
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);

  return new RegExp(`(${escapedWords.join("|")})`, "gi");
}

function HighlightedText({ text, nonVeganWords, maybeVeganWords }) {
  const nonVeganWordsSet = new Set(
    nonVeganWords.map((word) => word.toLowerCase()),
  );
  const maybeVeganWordsSet = new Set(
    maybeVeganWords.map((word) => word.toLowerCase()),
  );
  const highlightRegex = buildHighlightRegex([
    ...nonVeganWords,
    ...maybeVeganWords,
  ]);

  return (
    <TextContent>
      {text.split(highlightRegex).map((part, index) => {
        const normalizedPart = part.toLowerCase();

        if (nonVeganWordsSet.has(normalizedPart)) {
          return (
            <Highlight key={`${part}-${index}`} $variant="non-vegan">
              {part}
            </Highlight>
          );
        }

        if (maybeVeganWordsSet.has(normalizedPart)) {
          return (
            <Highlight key={`${part}-${index}`} $variant="maybe-vegan">
              {part}
            </Highlight>
          );
        }

        return part;
      })}
    </TextContent>
  );
}

const OffDataBox = memo(function OffDataBox({
  imageSrc,
  ingredients,
  additives,
  brandName,
  productName,
}) {
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

        <DataItem icon={<HiTag />} label="Nom" type="horizontal">
          {productName || <NoDataItem>Non disponible</NoDataItem>}
        </DataItem>

        <DataItem
          icon={<HiOutlineListBullet />}
          label="Ingredients"
          type="horizontal"
        >
          {ingredients ? (
            <HighlightedText
              text={ingredients}
              nonVeganWords={NON_VEGAN_SEARCH_WORDS}
              maybeVeganWords={MAYBE_VEGAN_SEARCH_WORDS}
            />
          ) : (
            <NoDataItem>Non disponible</NoDataItem>
          )}
        </DataItem>

        <DataItem icon={<HiOutlineBeaker />} label="Additifs" type="horizontal">
          {additives ? (
            <HighlightedText
              text={additives.map((a) => a.split(":")[1]).join(", ")}
              nonVeganWords={NON_VEGAN_E_NUMBERS}
              maybeVeganWords={MAYBE_VEGAN_E_NUMBERS}
            />
          ) : (
            <NoDataItem>Non disponible</NoDataItem>
          )}
        </DataItem>
      </OffDescriptionBox>
    </StyledOffDataBox>
  );
});

export default OffDataBox;
