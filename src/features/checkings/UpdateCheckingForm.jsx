import { useController, useForm } from "react-hook-form";

import { CHECKING_STATUSES } from "@/utils/constants";
import { useUpdateProduct } from "@/features/products/useUpdateProduct";
import { useUpdateChecking } from "./useUpdateChecking";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Checkbox from "@/ui/Checkbox";
import Radios from "@/ui/Radios";
import Spinner from "@/ui/Spinner";

function UpdateCheckingForm({ checkingToUpdate, product, onCloseModal }) {
  const { id: updateId, ...updateValues } = checkingToUpdate;
  const { isUpdating, updateChecking } = useUpdateChecking();
  const { isUpdating: isUpdatingProduct, updateProduct } = useUpdateProduct();
  const { register, formState, handleSubmit, reset, control, watch } = useForm({
    defaultValues: {
      status: null,
      responded_on: new Date().toISOString().substring(0, 16),
      problem_description: updateValues.response,
      biodynamic: product.biodynamic,
      has_non_vegan_old_receipe: product.has_non_vegan_old_receipe,
    },
  });
  const { errors } = formState;
  const isPending = isUpdating || isUpdatingProduct;

  const watchFields = watch(["status"]);
  const { field: statusField } = useController({
    name: "status",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: isByodinamicField } = useController({
    name: "biodynamic",
    control,
    defaultValue: product.biodynamic,
  });
  const { field: hasNonVeganOldReceipeField } = useController({
    name: "has_non_vegan_old_receipe",
    control,
    defaultValue: product.has_non_vegan_old_receipe,
  });

  const showProblemField = ["MAYBE_VEGAN", "NON_VEGAN"].includes(
    watchFields[0]
  );

  function onSubmit(data) {
    const newProduct = {
      ...product,
      state: "WAITING_PUBLISH",
      status: data.status,
      biodynamic: data.biodynamic,
      has_non_vegan_old_receipe: data.has_non_vegan_old_receipe,
      problem_description: showProblemField ? data.problem_description : null,
    };
    updateChecking(
      { newData: { ...data, product_id: product.id }, id: updateId },
      {
        onSuccess: () => {
          updateProduct(
            {
              newData: newProduct,
              id: product.id,
            },
            {
              onSuccess: () => {
                reset();
                onCloseModal?.();
              },
            }
          );
        },
      }
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Date de la réponse" error={errors.responded_on?.message}>
        <Input
          id="responded_on"
          type="datetime-local"
          {...register("responded_on", {
            valueAsDate: true,
            required: "Ce champ est obligatoire",
          })}
          defaultValue={new Date().toISOString().substring(0, 16)}
          disabled={isPending}
          required
        />
      </FormRow>

      <FormRow label="Réponse" error={errors.status?.message}>
        <Radios
          id="status"
          onChange={statusField.onChange}
          defaultValue={watchFields[0]}
          required={true}
        >
          {Object.entries(CHECKING_STATUSES)
            .filter(([key, o]) => key !== "PENDING")
            .map(([key, o]) => (
              <Radios.RadioButton
                key={key}
                value={key}
                color={o.color}
                disabled={isPending}
              >
                {o.label}
              </Radios.RadioButton>
            ))}
        </Radios>
      </FormRow>

      {showProblemField && (
        <FormRow
          label="Problèmes"
          error={errors.problem_description?.message}
          hint="Raison pour laquelle le produit n'est pas vegan"
        >
          <Textarea
            id="problem_description"
            {...register("problem_description", {
              required:
                "Ce champ est obligatoire lorsque le status est 'MAYBE VEGAN' ou 'NON VEGAN'",
              validate: (value) => (showProblemField && !value ? false : true),
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

      <FormRow label="Ancienne recette non vegan ?" error={errors.has_non_vegan_old_receipe?.message}>
        <Checkbox
          name="has_non_vegan_old_receipe"
          onChange={hasNonVeganOldReceipeField.onChange}
          onBlur={hasNonVeganOldReceipeField.onBlur}
          checked={hasNonVeganOldReceipeField.value}
          value={hasNonVeganOldReceipeField.value}
          $inputRef={hasNonVeganOldReceipeField.ref}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
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

export default UpdateCheckingForm;
