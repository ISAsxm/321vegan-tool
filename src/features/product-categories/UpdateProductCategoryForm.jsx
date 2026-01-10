import { useController, useForm } from "react-hook-form";

import { getProductCategoriesForSelect } from "@/services/apiProductCategories";
import { useUpdateProductCategory } from "./useUpdateProductCategory";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Spinner from "@/ui/Spinner";

function UpdateProductCategoryForm({ productCategoryToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = productCategoryToUpdate;
  const { isUpdating, updateProductCategory } = useUpdateProductCategory();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      parent_category_id: productCategoryToUpdate.parent?.id || null,
    },
  });
  const { errors } = formState;

  const { field: parentField } = useController({
    name: "parent_category_id",
    control,
  });

  function onSubmit(data) {
    updateProductCategory(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  if (isUpdating) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        label="Catégorie parente"
        error={errors.parent_category_id?.message}
      >
        <Select
          name="parent_category_id"
          onChange={parentField.onChange}
          getOptions={getProductCategoriesForSelect}
          defaultValue={[parentField.value]}
          defaultOptions={
            productCategoryToUpdate.parent
              ? [
                  {
                    value: productCategoryToUpdate.parent.id,
                    label: productCategoryToUpdate.parent.name,
                  },
                ]
              : []
          }
          disabled={isUpdating}
          isSearchable={true}
          isNullable={true}
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

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isUpdating}
        >
          Annuler
        </Button>
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateProductCategoryForm;
