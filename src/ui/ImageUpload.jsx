import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/utils/constants";

import ButtonIcon from "./ButtonIcon";
import FileInput from "./FileInput";

import styled from "styled-components";
import { HiTrash } from "react-icons/hi";

const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledImage = styled.img`
  display: block;
  width: 6rem;
  height: 5.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.5rem;
  border-radius: var(--border-radius-sm);
`;

const ResetButton = styled(ButtonIcon).attrs({ type: "button" })`
  align-self: start;
  color: var(--color-red-100);
  background-color: var(--color-red-700);
  &:hover {
    background-color: var(--color-red-800);
  }
  & svg {
    width: 1.1rem;
    height: 1.1rem;
    color: currentColor;
  }
`;

function ImageUpload({ defaultValue = null, disabled, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();
  const defaultPreview = defaultValue ? `${API_URL}/${defaultValue}` : null;

  function handleSelectFile(value) {
    setSelectedFile(value);
    onUpload?.(value);
    if (!value) inputRef.current.value = "";
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(defaultPreview);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, defaultPreview]);

  return (
    <div>
      {preview && (
        <PreviewBox>
          <StyledImage src={preview} alt="Prévisualisation de l'image" />
          <ResetButton onClick={() => handleSelectFile(null)}>
            <HiTrash />
          </ResetButton>
        </PreviewBox>
      )}
      <FileInput
        ref={inputRef}
        accept="image/*"
        onChange={(e) => handleSelectFile(e.target.files[0])}
        disabled={disabled}
      />
    </div>
  );
}

export default ImageUpload;
