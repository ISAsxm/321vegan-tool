import { useForm } from "react-hook-form";

import { useUpdateScoringCategory } from "./useUpdateScoringCategory";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

function UpdateScoringCategoryForm({ categoryToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = categoryToUpdate;
  const { isUpdating, updateScoringCategory } = useUpdateScoringCategory();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: updateValues,
  });
  const { errors } = formState;

  function onSubmit(data) {
    updateScoringCategory(
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
      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
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
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateScoringCategoryForm;
