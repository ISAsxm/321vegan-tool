import { useController, useForm } from "react-hook-form";
import { useUpdateScoringCriterion } from "./useUpdateScoringCriterion";
import { getScoringCategoriesForSelect } from "@/services/apiScoring";

import CreateScoringCategoryForm from "@/features/scoring/categories/CreateScoringCategoryForm";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Select from "@/ui/Select";
import Input from "@/ui/Input";

function UpdateScoringCriterionForm({ criterionToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = criterionToUpdate;
  const { isUpdating, updateScoringCriterion } = useUpdateScoringCriterion();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      category_id: criterionToUpdate.category.id,
    },
  });
  const { errors } = formState;

  const { field: categoryField } = useController({
    name: "category_id",
    control,
    defaultValue: criterionToUpdate.category.id,
    rules: { required: "Ce champ est obligatoire" },
  });

  function onSubmit(data) {
    updateScoringCriterion(
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
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Catégorie" error={errors.category_id?.message}>
        <Select
          name="category_id"
          onChange={categoryField.onChange}
          getOptions={getScoringCategoriesForSelect}
          defaultOptions={[
            {
              value: criterionToUpdate.category.id,
              label: criterionToUpdate.category.name,
            },
          ]}
          defaultValue={[categoryField.value]}
          required={true}
          disabled={isUpdating}
          createComponent={<CreateScoringCategoryForm />}
        />
      </FormRow>

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
