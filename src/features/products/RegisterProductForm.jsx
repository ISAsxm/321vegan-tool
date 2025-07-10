import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";

import { PRODUCT_STATUSES, PRODUCT_STATES } from "@/utils/constants";
import { useBrandsForSelect } from "@/features/brands/useBrandsForSelect";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import { useUpdateProduct } from "./useUpdateProduct";
import CreateBrandForm from "@/features/brands/CreateBrandForm";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";
import Checkbox from "@/ui/Checkbox";
import Spinner from "@/ui/Spinner";

function RegisterProductForm({ productToCheckedIn, onClose }) {
  const { id: checkedId, ...checkedInValues } = productToCheckedIn;
  const { isUpdating, updateProduct } = useUpdateProduct();
  const { isLoading: isLoadingUser, userRoles } = useCurrentUser();
  const { isLoading: brandsIsLoading, brands } = useBrandsForSelect();
  const { register, formState, handleSubmit, reset, control, resetField } =
    useForm({
      defaultValues: {
        ...checkedInValues,
        brand_id: productToCheckedIn.brand?.id || null,
      },
    });
  const { errors } = formState;

  const isLoading = isLoadingUser || brandsIsLoading || isUpdating;

  const { field: brandField } = useController({
    name: "brand_id",
    control,
  });
  const { field: stateField } = useController({
    name: "state",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });
  const { field: statusField } = useController({
    name: "status",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });
  const { field: isByodinamicField } = useController({
    name: "biodynamic",
    control,
    defaultValue: checkedInValues.biodynamic,
  });

  // automatically update selected brand on OFFproduct data loaded
  useEffect(() => {
    if (productToCheckedIn.brand) return;
    const selectedBrand = brands?.filter((b) =>
      productToCheckedIn.brandName
        ?.toLowerCase()
        ?.includes(b.name?.toLowerCase())
    )[0]?.id;
    if (selectedBrand) resetField("brand_id", { defaultValue: selectedBrand });
  }, [brands, productToCheckedIn, resetField]);

  function onSubmit(data) {
    updateProduct(
      { newData: data, id: checkedId },
      {
        onSuccess: (data) => {
          reset(data);
          onClose?.();
        },
      }
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <Form type={"regular"}>
      <FormRow label="État" error={errors.state?.message}>
        <Select
          name="state"
          onChange={stateField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[stateField.value]}
          required={true}
          disabled={isLoading}
          options={Object.entries(PRODUCT_STATES).map(([key, o]) => {
            return {
              value: key,
              label: o.label,
              disabled: userRoles.includes(o.role) ? false : true,
            };
          })}
        />
      </FormRow>

      <FormRow label="Statut" error={errors.status?.message}>
        <Select
          name="status"
          onChange={statusField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[statusField.value]}
          required={true}
          disabled={isLoading}
          options={Object.entries(PRODUCT_STATUSES).map(([key, o]) => {
            return { value: key, label: o.label };
          })}
        />
      </FormRow>

      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={brandField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[brandField.value]}
          required={false}
          disabled={isLoading}
          options={brands || []}
          createComponent={
            <CreateBrandForm prefillName={productToCheckedIn.brandName} />
          }
        />
      </FormRow>

      <FormRow label="EAN" error={errors.ean?.message}>
        <Input
          type="text"
          id="ean"
          {...register("ean", { required: "Ce champ est obligatoire" })}
          disabled={isLoading}
          required
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Problèmes" error={errors.problem_description?.message}>
        <Textarea
          id="problem_description"
          {...register("problem_description")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Biodynamie ?" error={errors.biodynamic?.message}>
        <Checkbox
          name="biodynamic"
          onChange={isByodinamicField.onChange}
          onBlur={isByodinamicField.onBlur}
          checked={isByodinamicField.value}
          value={isByodinamicField.value}
          $inputRef={isByodinamicField.ref}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onClose()}
          disabled={isLoading}
        >
          Annuler
        </Button>
        <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </Button>
      </FormRow>
    </Form>
  );
}

export default RegisterProductForm;
