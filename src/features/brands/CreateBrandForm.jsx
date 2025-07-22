import { useController, useForm } from "react-hook-form";
import { useCreateBrand } from "./useCreateBrand";
import { getBrandsForSelect } from "@/services/apiBrands";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Spinner from "@/ui/Spinner";

function CreateBrandForm({ prefillName, onCloseModal, onCreateOption }) {
  const { isCreating, createBrand } = useCreateBrand();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      parent_id: null,
      name: prefillName || null,
    },
  });
  const { errors } = formState;

  const { field: parentField } = useController({
    name: "parent_id",
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
