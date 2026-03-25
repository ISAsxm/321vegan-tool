import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";

import { INTERESTING_PRODUCT_TYPES } from "@/utils/constants";
import { useUpdateInterestingProduct } from "./useUpdateInterestingProduct";
import { getBrandsForSelect } from "@/services/apiBrands";
import { getProductsForSelect } from "@/services/apiProducts";
import { getProductCategoriesForSelect } from "@/services/apiProductCategories";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import ImageUploader from "@/ui/ImageUploader";
import Spinner from "@/ui/Spinner";

import CreateProductCategoryForm from "@/features/product-categories/CreateProductCategoryForm";

function UpdateInterestingProductForm({
  interestingProductToUpdate,
  onCloseModal,
}) {
  const { id: updateId, ...updateValues } = interestingProductToUpdate;
  const { isUpdating, updateInterestingProduct } =
    useUpdateInterestingProduct();
  const {
    register,
    formState,
    handleSubmit,
    reset,
    control,
    watch,
    resetField,
  } = useForm({
    defaultValues: {
      ...updateValues,
      alternative_products: interestingProductToUpdate.alternative_products.map(
        (p) => p.id,
      ),
    },
  });
  const { errors } = formState;
  const watchFields = watch(["ean", "brand_id"]);
  const [isPending, setIsPending] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [alternativeProductOptions, setAlternativeProductOptions] = useState(
    [],
  );

  const { field: typeField } = useController({
    name: "type",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: categoryField } = useController({
    name: "category_id",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: brandField } = useController({
    name: "brand_id",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: eanField } = useController({
    name: "ean",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: alternativeProductsField } = useController({
    name: "alternative_products",
    control,
  });

  const { field: imageField } = useController({
    name: "image",
    control,
    defaultValue: interestingProductToUpdate.image || null,
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
    updateInterestingProduct(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsPending(true);
        const data = await getProductsForSelect([
          { field: `brand___id`, value: interestingProductToUpdate.brand_id },
        ]);
        setProductOptions(
          data.data.map((item) => ({
            ...item,
            id: item.value,
            value: item.ean,
            label: `${item.label} (${item.ean})`,
          })),
        );
        setAlternativeProductOptions(
          data.data.map((item) => ({
            ...item,
            label: `${item.label} (${item.ean})`,
            disabled: interestingProductToUpdate.ean === item.ean,
          })),
        );
      } catch (error) {
        console.error(error);
        setProductOptions([]);
        setAlternativeProductOptions([]);
      } finally {
        setIsPending(false);
      }
    };
    fetchProductData();
  }, [interestingProductToUpdate.brand_id, interestingProductToUpdate.ean]);

  if (isPending) return <Spinner />;

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
          disabled={isUpdating}
          isSearchable={true}
          isNullable={false}
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

      {productOptions.length > 0 && (
        <FormRow
          label="Code-barres (EAN) principal"
          error={errors.ean?.message}
        >
          <Select
            name="ean"
            onChange={onChangeEanField}
            defaultOptions={productOptions}
            defaultValue={[eanField.value]}
            disabled={isUpdating || !watchFields[1]}
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
            defaultValue={alternativeProductsField.value}
            disabled={isUpdating || !watchFields[1]}
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
            },
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

      <FormRow label="Image" error={errors.image?.message}>
        <ImageUploader
          id="image"
          onUpload={imageField.onChange}
          disabled={isUpdating}
          defaultValue={imageField.value}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Annuler
        </Button>
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateInterestingProductForm;
