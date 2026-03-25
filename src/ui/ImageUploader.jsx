import { useCallback, useEffect, useRef, useState } from "react";
import { API_URL } from "@/utils/constants";

import ButtonIcon from "./ButtonIcon";

import styled, { css } from "styled-components";
import { HiTrash } from "react-icons/hi";
import { MdOutlineImage } from "react-icons/md";

const StyledImageUploader = styled.div`
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  width: 100%;
  padding: 0.8rem 1.2rem;
  text-align: center;
  transition: border 0.2s;

  ${(props) =>
    props.$disabled
      ? css`
          border: 1px dashed var(--color-grey-300);
          background: var(--color-grey-200);
          color: var(--color-grey-300);
          cursor: not-allowed;
          & div label {
            cursor: not-allowed;
          }
        `
      : css`
          border: 1px dashed var(--color-grey-300);
          background: var(--color-grey-0);
          color: var(--color-grey-300);
          &:focus,
          &:focus-within {
            outline: 2px solid var(--color-brand-600);
            outline-offset: -1px;
            & div label {
              cursor: pointer;
              & span {
                color: var(--color-brand-600);
              }
            }
          }
        `}
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  & svg {
    width: 3rem;
    height: 3rem;
    color: currentColor;
  }

  & label {
    position: relative;
    margin-top: 0.5rem;
    font-weight: 500;

    & span {
      transition: color 0.2s;
    }

    & input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  }

  & p {
    margin-top: 0.25rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const StyledImage = styled.img`
  display: block;
  border-radius: var(--border-radius-sm);
  max-height: 10rem;
  max-width: 90%;
`;

const ResetButton = styled(ButtonIcon).attrs({ type: "button" })`
  align-self: start;
  color: var(--color-red-100);
  background-color: var(--color-red-700);
  &:hover {
    background-color: var(--color-red-800);
  }
  &:disabled {
    color: var(--color-grey-200);
    background-color: var(--color-grey-300);
    &:hover {
      background-color: var(--color-grey-300);
    }
  }
  & svg {
    width: 1.1rem;
    height: 1.1rem;
    color: currentColor;
  }
`;

function ImageUploader({
  id,
  defaultValue = null,
  previewBaseUrl = API_URL,
  disabled,
  onUpload,
  required = false,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();
  const defaultPreview = defaultValue
    ? `${previewBaseUrl}/${defaultValue}`
    : null;

  const handleSelectFile = useCallback(
    (value) => {
      if (disabled) return;
      setSelectedFile(value);
      onUpload?.(value);
      if (!value) inputRef.current.value = "";
    },
    [onUpload, disabled],
  );

  const handlePasteFile = useCallback(
    (e) => {
      e.stopPropagation();
      if (disabled) return;
      const fileList = e.clipboardData.files;
      if (fileList && fileList.length > 0) {
        const fileObject = fileList[0];
        handleSelectFile(fileObject);
      } else {
        console.log(
          "No image data was found in your clipboard. Copy an image first or take a screenshot.",
        );
      }
    },
    [handleSelectFile, disabled],
  );

  const handleDropFile = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (disabled) return;
      const fileList = e.dataTransfer.files;
      if (fileList && fileList.length > 0) {
        const fileObject = fileList[0];
        handleSelectFile(fileObject);
      } else {
        console.log(
          "No image data was found in your data transfer. Select an image first.",
        );
      }
    },
    [handleSelectFile, disabled],
  );

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
    <StyledImageUploader $disabled={disabled} tabIndex="0">
      <UploadBox
        onPaste={handlePasteFile}
        onDrop={handleDropFile}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <MdOutlineImage />
        <label htmlFor={`${id}-uploader`}>
          Déposer, coller <span> ou parcourir</span> pour télécharger
          <input
            ref={inputRef}
            id={`${id}-uploader`}
            type="file"
            accept="image/*"
            onChange={(e) => handleSelectFile(e.target.files[0])}
            disabled={disabled}
            required={required}
          />
        </label>
        <p>PNG, JPG, JPEG, WEBP max 5MB</p>
      </UploadBox>

      {preview && (
        <PreviewBox>
          <StyledImage src={preview} alt="Image" />
          <ResetButton
            onClick={() => handleSelectFile(null)}
            disabled={disabled}
          >
            <HiTrash />
          </ResetButton>
        </PreviewBox>
      )}
    </StyledImageUploader>
  );
}

export default ImageUploader;
