import { useForm } from "react-hook-form";
import { useUpdateScoringCriterion } from "./useUpdateScoringCriterion";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

function UpdateScoringCriterionForm({ criterionToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = criterionToUpdate;
  const { isUpdating, updateScoringCriterion } = useUpdateScoringCriterion();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: updateValues,
  });
  const { errors } = formState;

  function onSubmit(data) {
    updateScoringCriterion(
      {
        newData: data,
        id: updateId,
        category_id: criterionToUpdate.category.id,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
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
        <Button disabled={isUpdating} onClick={handleSubmit(onSubmit)}>
          Modifier
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateScoringCriterionForm;
