import { API_URL } from "@/utils/constants";

import { HiPhoto } from "react-icons/hi2";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-sm);
`;

const NoLogoPlaceholder = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-400);
  font-size: 1.8rem;
`;

function BrandLogo({ brand }) {
  const { logo_path, name } = brand;
  return (
    <LogoContainer>
      {logo_path ? (
        <LogoImg src={`${API_URL}/${logo_path}`} alt={`Logo ${name}`} />
      ) : (
        <NoLogoPlaceholder>
          <HiPhoto />
        </NoLogoPlaceholder>
      )}
    </LogoContainer>
  );
}

export default BrandLogo;
