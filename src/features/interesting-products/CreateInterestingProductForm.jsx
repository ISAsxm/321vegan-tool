import { useState } from "react";
import { useController, useForm } from "react-hook-form";

import { INTERESTING_PRODUCT_TYPES } from "@/utils/constants";
import { useCreateInterestingProduct } from "./useCreateInterestingProduct";
import { getBrandsForSelect } from "@/services/apiBrands";
import { getProductsForSelect } from "@/services/apiProducts";
import { getProductCategoriesForSelect } from "@/services/apiProductCategories";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import ImageUploader from "@/ui/ImageUploader";

import CreateProductCategoryForm from "@/features/product-categories/CreateProductCategoryForm";

function CreateInterestingProductForm({ onCloseModal }) {
  const { isCreating, createInterestingProduct } =
    useCreateInterestingProduct();
  const {
    register,
    formState,
    handleSubmit,
    reset,
    control,
    watch,
    resetField,
  } = useForm();
  const { errors } = formState;
  const watchFields = watch(["ean", "brand_id"]);
  const [productOptions, setProductOptions] = useState([]);
  const [alternativeProductOptions, setAlternativeProductOptions] = useState(
    [],
  );

  const { field: typeField } = useController({
    name: "type",
    control,
    defaultValue: Object.keys(INTERESTING_PRODUCT_TYPES)[0],
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: categoryField } = useController({
    name: "category_id",
    control,
    defaultValue: null,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: brandField } = useController({
    name: "brand_id",
    control,
    defaultValue: null,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: eanField } = useController({
    name: "ean",
    control,
    defaultValue: null,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: alternativeProductsField } = useController({
    name: "alternative_products",
    control,
    defaultValue: null,
  });

  const { field: imageField } = useController({
    name: "image",
    control,
  });

  function resetOptions() {
    setProductOptions([]);
    setAlternativeProductOptions([]);
    resetField("ean");
    resetField("alternative_products");
  }

  async function getProductOptions(value) {
    try {
      const data = await getProductsForSelect([
        { field: `brand___id`, value: value },
      ]);
      setProductOptions(
        data.data.map((item) => ({
          ...item,
          id: item.value,
          value: item.ean,
          label: `${item.label} (${item.ean})`,
        })),
      );
      return data;
    } catch (error) {
      console.error(error);
      resetOptions();
      return [];
    }
  }

  function onChangeBrandField(value) {
    resetOptions();
    brandField.onChange(value);
    if (value) {
      getProductOptions(value);
    }
  }

  function onChangeEanField(value) {
    eanField.onChange(value);
    if (value) {
      setAlternativeProductOptions(
        productOptions.map((item) => ({
          ...item,
          value: item.id,
          disabled: value === item.ean,
        })),
      );
    } else {
      resetOptions();
    }
  }

  function onSubmit(data) {
    createInterestingProduct(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={onChangeBrandField}
          getOptions={getBrandsForSelect}
          disabled={isCreating}
          isSearchable={true}
          isNullable={false}
          required
        />
      </FormRow>

      {productOptions.length > 0 && (
        <FormRow
          label="Code-barres (EAN) principal"
          error={errors.ean?.message}
        >
          <Select
            name="ean"
            onChange={onChangeEanField}
            defaultOptions={productOptions}
            disabled={isCreating || !watchFields[1]}
            isSearchable={true}
            isNullable={false}
            required
          />
        </FormRow>
      )}
      {productOptions.length <= 0 && (
        <FormRow
          label="Code-barres (EAN) principal"
          error={errors.ean?.message}
        >
          <Select
            name="ean"
            onChange={onChangeEanField}
            disabled={true}
            required
          />
        </FormRow>
      )}

      {alternativeProductOptions.length > 0 && (
        <FormRow
          label="Code-barres (EAN) alternatifs"
          error={errors.alternative_products?.message}
        >
          <Select
            name="alternative_products"
            onChange={alternativeProductsField.onChange}
            defaultOptions={alternativeProductOptions}
            disabled={isCreating || !watchFields[1]}
            isSearchable={true}
            isNullable={true}
            isMulti={true}
          />
        </FormRow>
      )}
      {alternativeProductOptions.length <= 0 && (
        <FormRow
          label="Code-barres (EAN) alternatifs"
          error={errors.alternative_products?.message}
        >
          <Select
            name="alternative_products"
            onChange={alternativeProductsField.onChange}
            disabled={true}
            isMulti={true}
          />
        </FormRow>
      )}

      <FormRow label="Dénomination" error={errors.name?.message}>
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
            },
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
          createComponent={<CreateProductCategoryForm />}
          disabled={isCreating}
          isSearchable={true}
          isNullable={false}
          required
        />
      </FormRow>

      <FormRow label="Image" error={errors.image?.message}>
        <ImageUploader
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
