import { API_URL } from "@/utils/constants";

import { HiPhoto } from "react-icons/hi2";
import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
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

function ImageDetail({ path, alt = "Logo", size = 4 }) {
  return (
    <ImageContainer>
      {path ? (
        <Img src={`${API_URL}/${path}`} alt={alt} $size={size} />
      ) : (
        <NoImagePlaceholder $size={size}>
          <HiPhoto />
        </NoImagePlaceholder>
      )}
    </ImageContainer>
  );
}

export default ImageDetail;
