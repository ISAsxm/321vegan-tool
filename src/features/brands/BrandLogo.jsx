import styled from "styled-components";
import { HiPhoto } from "react-icons/hi2";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 4rem;
  height: 4rem;
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

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  if (logo_path) {
    const logoUrl = `${apiBaseUrl}/${logo_path}`;
    return (
      <LogoContainer>
        <LogoImg src={logoUrl} alt={`Logo ${name}`} />
      </LogoContainer>
    );
  }

  return (
    <LogoContainer>
      <NoLogoPlaceholder>
        <HiPhoto />
      </NoLogoPlaceholder>
    </LogoContainer>
  );
}

export default BrandLogo;
