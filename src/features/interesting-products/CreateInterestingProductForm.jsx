import { useController, useForm } from "react-hook-form";

import { INTERESTING_PRODUCT_TYPES } from "@/utils/constants";
import { useCreateInterestingProduct } from "./useCreateInterestingProduct";
import { getBrandsForSelect } from "@/services/apiBrands";
import { getProductCategoriesForSelect } from "@/services/apiProductCategories";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import ImageUpload from "@/ui/ImageUpload";

function CreateInterestingProductForm({ onCloseModal }) {
  const { isCreating, createInterestingProduct } = useCreateInterestingProduct();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ean: null,
      name: null,
      image: null,
      type: Object.keys(INTERESTING_PRODUCT_TYPES)[0],
      category_id: null,
      brand_id: null,
    },
  });
  const { errors } = formState;

  const { field: typeField } = useController({
    name: "type",
    control,
    defaultValue: Object.keys(INTERESTING_PRODUCT_TYPES)[0],
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: categoryField } = useController({
    name: "category_id",
    control,
  });

  const { field: brandField } = useController({
    name: "brand_id",
    control,
  });

  const { field: imageField } = useController({
    name: "image",
    control,
  });

  function onSubmit(data) {
    createInterestingProduct(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Code-barres (EAN)" error={errors.ean?.message}>
        <Input
          type="text"
          id="ean"
          {...register("ean", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Catégorie" error={errors.category_id?.message}>
        <Select
          name="category_id"
          onChange={categoryField.onChange}
          getOptions={getProductCategoriesForSelect}
          disabled={isCreating}
          isSearchable={true}
          isNullable={true}
        />
      </FormRow>

      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={brandField.onChange}
          getOptions={getBrandsForSelect}
          disabled={isCreating}
          isSearchable={true}
          isNullable={true}
        />
      </FormRow>

      <FormRow label="Image" error={errors.image?.message}>
        <ImageUpload
          id="image"
          onUpload={imageField.onChange}
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
        <Button disabled={isCreating}>Créer</Button>
      </FormRow>
    </Form>
  );
}

export default CreateInterestingProductForm;
