import { useController, useForm } from "react-hook-form";
import { useState } from "react";

import { getBrandsForSelect } from "@/services/apiBrands";
import { useUpdateBrand } from "./useUpdateBrand";
import { useUploadBrandLogo } from "./useUploadBrandLogo";
import { useDeleteBrandLogo } from "./useDeleteBrandLogo";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import FileInput from "@/ui/FileInput";

import Spinner from "@/ui/Spinner";
import styled from "styled-components";

const LogoContainer = styled.div`
  margin-bottom: 1rem;
`;

function UpdateBrandForm({ brandToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = brandToUpdate;
  const { isUpdating, updateBrand } = useUpdateBrand();
  const { isUploading, uploadBrandLogo } = useUploadBrandLogo();
  const { isDeleting, deleteBrandLogo } = useDeleteBrandLogo();
  const [selectedLogo, setSelectedLogo] = useState(null);
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      parent_id: brandToUpdate.parent?.id || null,
    },
  });
  const { errors } = formState;

  const { field: parentField } = useController({
    name: "parent_id",
    control,
  });

  function onSubmit(data) {
    updateBrand(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          setSelectedLogo(null);
          onCloseModal?.();
        },
      }
    );
  }

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedLogo(file);
      uploadBrandLogo(
        { id: updateId, logoFile: file },
        {
          onSuccess: () => {
            setSelectedLogo(null);
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
    deleteBrandLogo(updateId, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  };

  if (isUpdating || isDeleting) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Maison mère" error={errors.parent_id?.message}>
        <Select
          name="parent_id"
          onChange={parentField.onChange}
          getOptions={getBrandsForSelect}
          defaultValue={[parentField.value]}
          defaultOptions={
            brandToUpdate.parent
              ? [
                  {
                    value: brandToUpdate.parent.id,
                    label: brandToUpdate.parent.name,
                  },
                ]
              : []
          }
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message} htmlFor="name">
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Logo" htmlFor="logo">
        {brandToUpdate.logo_path && (
          <LogoContainer>
            <img 
              src={`${import.meta.env.VITE_API_URL}/${brandToUpdate.logo_path}`}
              alt={`Logo de ${brandToUpdate.name}`}
            />
            <Button
              $variation="danger"
              $size="small"
              type="button"
              onClick={handleDeleteLogo}
              disabled={isUpdating || isDeleting}
            >
              Supprimer
            </Button>
          </LogoContainer>
        )}
        <FileInput
          id="logo"
          accept="image/*"
          onChange={handleLogoChange}
          disabled={isUpdating || isUploading || isDeleting}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isUpdating || isDeleting}
        >
          Annuler
        </Button>
        <Button disabled={isUpdating || isDeleting}>
          {isDeleting ? "Suppression en cours..." : "Modifier"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateBrandForm;
