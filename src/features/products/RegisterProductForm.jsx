import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import styled from "styled-components";

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
import ColoredButton from "@/ui/ColoredButton";

const ButtonRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const ButtonLabel = styled.label`
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

function RegisterProductForm({ productToCheckedIn, onClose }) {
  const { id: checkedId, ...checkedInValues } = productToCheckedIn;
  const { isUpdating, updateProduct } = useUpdateProduct();
  const { isPending: isPendingUser, userRoles } = useCurrentUser();
  const { isPending: brandsisPending, brands } = useBrandsForSelect();
  const {
    register,
    formState,
    handleSubmit,
    reset,
    control,
    resetField,
    getValues,
  } = useForm({
    defaultValues: {
      ...checkedInValues,
      brand_id: productToCheckedIn.brand?.id || null,
    },
  });
  const { errors } = formState;

  const isPending = isPendingUser || brandsisPending || isUpdating;

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

  // Show problems field only for MAYBE_VEGAN or NON_VEGAN status
  const shouldShowProblemsField = ["MAYBE_VEGAN", "NON_VEGAN"].includes(
    getValues().status
  );

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
    if (!shouldShowProblemsField) {
      data.problem_description = null;
    }

    updateProduct(
      { newData: data, id: checkedId },
      {
        onSuccess: (responseData) => {
          // Only reset with the response data if it exists and has the expected structure
          if (responseData && typeof responseData === 'object') {
            reset(responseData);
          }
          onClose?.();
        },
      }
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Form type={"regular"}>
      <ButtonRow>
        <ButtonLabel>État</ButtonLabel>
        <ButtonContainer>
          {Object.entries(PRODUCT_STATES)
            .filter(([key, o]) => userRoles.includes(o.role))
            .map(([key, o]) => (
              <ColoredButton
                key={key}
                type="button"
                $color={o.color}
                $isSelected={stateField.value === key}
                onClick={() => stateField.onChange(key)}
                disabled={isPending}
                title={`Changer l'état à "${o.label}"`}
              >
                {o.label}
              </ColoredButton>
            ))}
        </ButtonContainer>
      </ButtonRow>

      <ButtonRow>
        <ButtonLabel>Statut</ButtonLabel>
        <ButtonContainer>
          {Object.entries(PRODUCT_STATUSES).map(([key, o]) => (
            <ColoredButton
              key={key}
              type="button"
              $color={o.color}
              $isSelected={statusField.value === key}
              onClick={() => statusField.onChange(key)}
              disabled={isPending}
              title={`Changer le statut à "${o.label}"`}
            >
              {o.label}
            </ColoredButton>
          ))}
        </ButtonContainer>
      </ButtonRow>

      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={brandField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[brandField.value]}
          required={false}
          disabled={isPending}
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
          disabled={isPending}
          required
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isPending}
        />
      </FormRow>

      {shouldShowProblemsField && (
        <FormRow
          label="Problèmes"
          hint="Raison pour laquelle le produit n'est pas vegan"
          error={errors.problem_description?.message}
        >
          <Textarea
            id="problem_description"
            {...register("problem_description", {
              validate: (value) => {
                ["MAYBE_VEGAN", "NON_VEGAN"].includes(getValues().status) &&
                  !value &&
                  "Ce champ est obligatoire";
              },
            })}
            disabled={isPending}
            required
          />
        </FormRow>
      )}

      <FormRow label="Biodynamie ?" error={errors.biodynamic?.message}>
        <Checkbox
          name="biodynamic"
          onChange={isByodinamicField.onChange}
          onBlur={isByodinamicField.onBlur}
          checked={isByodinamicField.value}
          value={isByodinamicField.value}
          $inputRef={isByodinamicField.ref}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onClose()}
          disabled={isPending}
        >
          Annuler
        </Button>
        <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </Button>
      </FormRow>
    </Form>
  );
}

export default RegisterProductForm;
