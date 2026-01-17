import { useController, useForm } from "react-hook-form";

import { useUpdateHouseholdCleaner } from "./useUpdateHouseholdCleaner";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Checkbox from "@/ui/Checkbox";

function UpdateHouseholdCleanerForm({
  householdCleanerToUpdate,
  onCloseModal,
}) {
  const { id: updateId, ...updateValues } = householdCleanerToUpdate;
  const { isUpdating, updateHouseholdCleaner } = useUpdateHouseholdCleaner();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: updateValues,
  });
  const { errors } = formState;

  const { field: isVeganField } = useController({
    name: "is_vegan",
    control,
    defaultValue: householdCleanerToUpdate.is_vegan,
  });
  const { field: isCFField } = useController({
    name: "is_cruelty_free",
    control,
    defaultValue: householdCleanerToUpdate.is_cruelty_free,
  });

  function onSubmit(data) {
    updateHouseholdCleaner(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nom de la marque" error={errors.brand_name?.message}>
        <Input
          type="text"
          id="brand_name"
          {...register("brand_name")}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isUpdating}
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

      <FormRow label="Cruelty Free ?" error={errors.is_cruelty_free?.message}>
        <Checkbox
          name="is_cruelty_free"
          onChange={isCFField.onChange}
          onBlur={isCFField.onBlur}
          checked={isCFField.value}
          value={isCFField.value}
          $inputRef={isCFField.ref}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Source" error={errors.source?.message}>
        <Input
          type="text"
          id="source"
          {...register("source")}
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

export default UpdateHouseholdCleanerForm;
