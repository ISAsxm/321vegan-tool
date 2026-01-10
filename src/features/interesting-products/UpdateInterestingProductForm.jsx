import { useController, useForm } from "react-hook-form";

import { INTERESTING_PRODUCT_TYPES } from "@/utils/constants";
import { useUpdateInterestingProduct } from "./useUpdateInterestingProduct";
import { getBrandsForSelect } from "@/services/apiBrands";
import { getProductCategoriesForSelect } from "@/services/apiProductCategories";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import ImageUpload from "@/ui/ImageUpload";

import CreateBrandForm from "@/features/brands/CreateBrandForm";
import CreateProductCategoryForm from "@/features/product-categories/CreateProductCategoryForm";

function UpdateInterestingProductForm({
  interestingProductToUpdate,
  onCloseModal,
}) {
  const { id: updateId, ...updateValues } = interestingProductToUpdate;
  const { isUpdating, updateInterestingProduct } =
    useUpdateInterestingProduct();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
    },
  });
  const { errors } = formState;

  const { field: typeField } = useController({
    name: "type",
    control,
    defaultValue: updateValues.type,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: categoryField } = useController({
    name: "category_id",
    control,
    defaultValue: interestingProductToUpdate.category_id || null,
  });

  const { field: brandField } = useController({
    name: "brand_id",
    control,
    defaultValue: interestingProductToUpdate.brand_id || null,
  });

  const { field: imageField } = useController({
    name: "image",
    control,
    defaultValue: interestingProductToUpdate.image || null,
  });

  function onSubmit(data) {
    updateInterestingProduct(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Code-barres (EAN)" error={errors.ean?.message}>
        <Input
          type="text"
          id="ean"
          {...register("ean", {
            required: "Ce champ est obligatoire",
            pattern: {
              value: /^\d{13}$/,
              message: "Le code-barres doit contenir 13 chiffres",
            },
          })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Type" error={errors.type?.message}>
        <Select
          name="type"
          onChange={typeField.onChange}
          isSearchable={true}
          defaultValue={[typeField.value]}
          defaultOptions={Object.entries(INTERESTING_PRODUCT_TYPES).map(
            ([key, o]) => {
              return { value: key, label: o.label };
            }
          )}
          required={true}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Catégorie" error={errors.category_id?.message}>
        <Select
          name="category_id"
          onChange={categoryField.onChange}
          getOptions={getProductCategoriesForSelect}
          createComponent={<CreateProductCategoryForm />}
          disabled={isUpdating}
          isSearchable={true}
          isNullable={true}
          defaultValue={[categoryField.value]}
          defaultOptions={
            interestingProductToUpdate.category_id &&
            interestingProductToUpdate.category_name
              ? [
                  {
                    value: interestingProductToUpdate.category_id,
                    label: interestingProductToUpdate.category_name,
                  },
                ]
              : []
          }
        />
      </FormRow>

      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={brandField.onChange}
          getOptions={getBrandsForSelect}
          createComponent={<CreateBrandForm />}
          disabled={isUpdating}
          isSearchable={true}
          isNullable={true}
          defaultValue={[brandField.value]}
          defaultOptions={
            interestingProductToUpdate.brand_id &&
            interestingProductToUpdate.brand_name
              ? [
                  {
                    value: interestingProductToUpdate.brand_id,
                    label: interestingProductToUpdate.brand_name,
                  },
                ]
              : []
          }
        />
      </FormRow>

      <FormRow label="Image" error={errors.image?.message}>
        <ImageUpload
          id="image"
          onUpload={imageField.onChange}
          disabled={isUpdating}
          defaultValue={imageField.value}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" onClick={() => reset()}>
          Annuler
        </Button>
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateInterestingProductForm;
