import { useController, useForm } from "react-hook-form";

import { useUpdateCosmetic } from "./useUpdateCosmetic";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Checkbox from "@/ui/Checkbox";

function UpdateCosmeticForm({ cosmeticToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = cosmeticToUpdate;
  const { isUpdating, updateCosmetic } = useUpdateCosmetic();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: updateValues,
  });
  const { errors } = formState;

  const { field: isVeganField } = useController({
    name: "is_vegan",
    control,
    defaultValue: false,
  });
  const { field: isCFField } = useController({
    name: "is_cf",
    control,
    defaultValue: false,
  });

  function onSubmit(data) {
    updateCosmetic(
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
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nom de la marque" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Végane ?" error={errors.is_vegan?.message}>
        <Checkbox
          name="is_vegan"
          onChange={isVeganField.onChange}
          onBlur={isVeganField.onBlur}
          checked={isVeganField.value}
          value={isVeganField.value}
          $inputRef={isVeganField.ref}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Cruelty Free ?" error={errors.is_cf?.message}>
        <Checkbox
          name="is_cf"
          onChange={isCFField.onChange}
          onBlur={isCFField.onBlur}
          checked={isCFField.value}
          value={isCFField.value}
          $inputRef={isCFField.ref}
          disabled={isUpdating}
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

export default UpdateCosmeticForm;
