import { API_URL } from "@/utils/constants";

import { HiPhoto } from "react-icons/hi2";
import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  display: block;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-sm);
  width: ${(props) => `${props.$size}rem`};
  height: ${(props) => `${props.$size}rem`};
`;

const NoImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-400);
  padding: 0.6rem;
  width: ${(props) => `${props.$size}rem`};
  height: ${(props) => `${props.$size}rem`};

  & svg {
    width: ${(props) => `${props.$size / 1.5}rem`};
    height: ${(props) => `${props.$size / 1.5}rem`};
  }
`;

function InterestingProductImage({ interestingProduct, size = 4 }) {
  const { image, name } = interestingProduct;
  return (
    <ImageContainer>
      {image ? (
        <ProductImg
          src={`${API_URL}/${image}`}
          alt={`Image ${name}`}
          $size={size}
        />
      ) : (
        <NoImagePlaceholder $size={size}>
          <HiPhoto />
        </NoImagePlaceholder>
      )}
    </ImageContainer>
  );
}

export default InterestingProductImage;
