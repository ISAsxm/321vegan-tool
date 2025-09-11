import { useController, useForm } from "react-hook-form";
import { useCreateBrand } from "./useCreateBrand";
import { getBrandsForSelect } from "@/services/apiBrands";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Spinner from "@/ui/Spinner";
import ImageUpload from "@/ui/ImageUpload";

function CreateBrandForm({ prefillName, onCloseModal, onCreateOption }) {
  const { isCreating, createBrand } = useCreateBrand();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      parent_id: null,
      name: prefillName || null,
      logo_path: null,
    },
  });
  const { errors } = formState;

  const { field: parentField } = useController({
    name: "parent_id",
    control,
  });

  const { field: logoField } = useController({
    name: "logo_path",
    control,
  });

  function onSubmit(data) {
    createBrand(data, {
      onSuccess: (data) => {
        reset();
        onCloseModal?.();
        onCreateOption?.({ value: data.id, label: data.name });
      },
    });
  }

  if (isCreating) return <Spinner />;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Maison mère" error={errors.parent_id?.message}>
        <Select
          name="parent_id"
          onChange={parentField.onChange}
          isSearchable={true}
          disabled={isCreating}
          getOptions={getBrandsForSelect}
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Logo" error={errors.logo_path?.message}>
        <ImageUpload
          id="logo_path"
          onUpload={logoField.onChange}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Annuler
        </Button>
        <Button disabled={isCreating} onClick={handleSubmit(onSubmit)}>
          Créer
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBrandForm;
