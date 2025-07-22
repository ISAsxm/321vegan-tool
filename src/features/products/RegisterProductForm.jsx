import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";

import { PRODUCT_STATUSES, PRODUCT_STATES } from "@/utils/constants";
import { getBrandsForSelect } from "@/services/apiBrands";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import { useUpdateProduct } from "./useUpdateProduct";
import CreateBrandForm from "@/features/brands/CreateBrandForm";

import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";
import Checkbox from "@/ui/Checkbox";
import Spinner from "@/ui/Spinner";
import ColoredButton from "@/ui/ColoredButton";

function RegisterProductForm({ productToCheckedIn, onClose }) {
  const { id: checkedId, ...checkedInValues } = productToCheckedIn;
  const { isUpdating, updateProduct } = useUpdateProduct();
  const { isPending: isPendingUser, userRoles } = useCurrentUser();

  const { register, formState, handleSubmit, reset, control, getValues } =
    useForm({
      defaultValues: {
        ...checkedInValues,
        brand_id: productToCheckedIn.brand?.id || null,
      },
    });
  const { errors } = formState;

  const isPending = isPendingUser || isUpdating;

  const { field: brandField } = useController({
    name: "brand_id",
    control,
    defaultValue: productToCheckedIn.brand?.id || null,
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

  // Check if status should be locked when state is NEED_CONTACT
  const isStatusLocked = stateField.value === "NEED_CONTACT";

  // Auto-set status to MAYBE_VEGAN when state is NEED_CONTACT
  useEffect(() => {
    if (
      stateField.value === "NEED_CONTACT" &&
      statusField.value !== "MAYBE_VEGAN"
    ) {
      statusField.onChange("MAYBE_VEGAN");
    }
  }, [stateField.value, statusField]);

  function onSubmit(data) {
    if (!shouldShowProblemsField) {
      data.problem_description = null;
    }
    updateProduct(
      { newData: data, id: checkedId },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      }
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Form type={"regular"}>
      <FormRow label="État" error={errors.state?.message}>
        <ButtonGroup id="state" className="required">
          {Object.entries(PRODUCT_STATES).map(([key, o]) => (
            <ColoredButton
              key={key}
              type="button"
              color={o.color}
              $isSelected={stateField.value === key}
              onClick={() => stateField.onChange(key)}
              disabled={isPending || !userRoles.includes(o.role)}
              title={`Changer l'état à "${o.label}"`}
            >
              {o.label}
            </ColoredButton>
          ))}
        </ButtonGroup>
      </FormRow>

      <FormRow label="Statut" error={errors.status?.message}>
        <ButtonGroup id="status" className="required">
          {Object.entries(PRODUCT_STATUSES).map(([key, o]) => (
            <ColoredButton
              key={key}
              type="button"
              color={o.color}
              $isSelected={statusField.value === key}
              onClick={() => !isStatusLocked && statusField.onChange(key)}
              disabled={isPending || isStatusLocked}
              title={
                isStatusLocked
                  ? `Le statut est verrouillé sur "Maybe vegan" pour l'état "À contacter"`
                  : `Changer le statut à "${o.label}"`
              }
            >
              {o.label}
            </ColoredButton>
          ))}
        </ButtonGroup>
      </FormRow>

      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={brandField.onChange}
          getOptions={getBrandsForSelect}
          defaultOptions={
            productToCheckedIn.brand
              ? [
                  {
                    value: productToCheckedIn.brand.id,
                    label: productToCheckedIn.brand.name,
                  },
                ]
              : []
          }
          defaultValue={[brandField.value]}
          disabled={isUpdating}
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
          disabled={true}
          readOnly={true}
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
