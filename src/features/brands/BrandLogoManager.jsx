import { useState } from "react";
import styled from "styled-components";

import { useUploadBrandLogo } from "./useUploadBrandLogo";
import { useDeleteBrandLogo } from "./useDeleteBrandLogo";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";

const LogoContainer = styled.div`
  margin-bottom: 1rem;
`;

const BrandLogoManagerContainer = styled.div`
`;

function BrandLogoManager({ 
  brand, 
  onLogoUpdated, 
  disabled = false,
  id = "brand-logo"
}) {
  const { isUploading, uploadBrandLogo } = useUploadBrandLogo();
  const { isDeleting, deleteBrandLogo } = useDeleteBrandLogo();
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedLogo(file);
      uploadBrandLogo(
        { id: brand.id, logoFile: file },
        {
          onSuccess: () => {
            setSelectedLogo(null);
            onLogoUpdated?.();
          },
          onError: () => {
            setSelectedLogo(null);
            event.target.value = '';
          }
        }
      );
    }
  };

  const handleDeleteLogo = () => {
    deleteBrandLogo(brand.id, {
      onSuccess: () => {
        onLogoUpdated?.();
      },
    });
  };

  const isProcessing = isUploading || isDeleting;

  return (
    <BrandLogoManagerContainer id={id}>
      {brand.logo_path && (
        <LogoContainer>
          <img 
            src={`${import.meta.env.VITE_API_URL}/${brand.logo_path}`}
            alt={`Logo de ${brand.name}`}
          />
        <Button
              $variation="danger"
              $size="small"
              type="button"
              onClick={handleDeleteLogo}
              disabled={disabled || isProcessing}
            >
              Supprimer
        </Button>
        </LogoContainer>
      )}
      
      <FileInput
        accept="image/*"
        onChange={handleLogoChange}
        disabled={disabled || isProcessing}
      />
      
    </BrandLogoManagerContainer>
  );
}

export default BrandLogoManager;
