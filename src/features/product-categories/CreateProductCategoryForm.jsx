import { useController, useForm } from "react-hook-form";
import { useCreateProductCategory } from "./useCreateProductCategory";
import { getProductCategoriesForSelect } from "@/services/apiProductCategories";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Spinner from "@/ui/Spinner";

function CreateProductCategoryForm({ onCloseModal, onCreateOption }) {
  const { isCreating, createProductCategory } = useCreateProductCategory();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      parent_category_id: null,
      name: null,
    },
  });
  const { errors } = formState;

  const { field: parentField } = useController({
    name: "parent_category_id",
    control,
  });

  function onSubmit(data) {
    createProductCategory(data, {
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
      <FormRow
        label="Catégorie parente"
        error={errors.parent_category_id?.message}
      >
        <Select
          name="parent_category_id"
          onChange={parentField.onChange}
          getOptions={getProductCategoriesForSelect}
          disabled={isCreating}
          isSearchable={true}
          isNullable={true}
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

export default CreateProductCategoryForm;
