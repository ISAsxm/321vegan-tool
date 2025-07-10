import { useController, useForm } from "react-hook-form";
import { useCreateCosmetic } from "./useCreateCosmetic";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Checkbox from "@/ui/Checkbox";

function CreateCosmeticForm({ onCloseModal }) {
  const { isCreating, createCosmetic } = useCreateCosmetic();
  const { register, formState, handleSubmit, reset, control } = useForm();
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

  function onSubmit({ name, is_vegan, is_cf }) {
    createCosmetic({ name, is_vegan, is_cf });
    reset();
    onCloseModal?.();
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
          disabled={isCreating}
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
          disabled={isCreating}
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

export default CreateCosmeticForm;
