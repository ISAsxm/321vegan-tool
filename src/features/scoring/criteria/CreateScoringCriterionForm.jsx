import { useController, useForm } from "react-hook-form";
import { useCreateScoringCriterion } from "./useCreateScoringCriterion";
import { getScoringCategoriesForSelect } from "@/services/apiScoring";

import CreateScoringCategoryForm from "@/features/scoring/categories/CreateScoringCategoryForm";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Select from "@/ui/Select";
import Input from "@/ui/Input";

function CreateScoringCriterionForm({ defaultCategory, onCloseModal }) {
  const { isCreating, createScoringCriterion } = useCreateScoringCriterion();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: null,
      category_id: defaultCategory?.id,
    },
  });
  const { errors } = formState;

  const { field: categoryField } = useController({
    name: "category_id",
    control,
    defaultValue: defaultCategory?.id || null,
    rules: { required: "Ce champ est obligatoire" },
  });

  function onSubmit(data) {
    createScoringCriterion(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Catégorie" error={errors.category_id?.message}>
        <Select
          name="category_id"
          onChange={categoryField.onChange}
          getOptions={getScoringCategoriesForSelect}
          defaultOptions={
            defaultCategory
              ? [
                  {
                    value: defaultCategory.id,
                    label: defaultCategory.name,
                  },
                ]
              : []
          }
          defaultValue={[categoryField.value]}
          required={true}
          disabled={isCreating}
          createComponent={<CreateScoringCategoryForm />}
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
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
        <Button disabled={isCreating} onClick={handleSubmit(onSubmit)}>
          Créer
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateScoringCriterionForm;
