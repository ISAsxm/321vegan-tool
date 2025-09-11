import { useFieldArray, useForm } from "react-hook-form";
import { useCreateScoringCategory } from "./useCreateScoringCategory";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import FormCol from "@/ui/FormCol";
import Input from "@/ui/Input";
import {
  ScoringCriteriaFormList,
  ScoringCriteriaFormItem,
  ScoringCriteriaFormButtonDelete,
  ScoringCriteriaFormButtonAdd,
} from "@/features/scoring/criteria/ScoringCriteriaFormList";
import { HiTrash } from "react-icons/hi2";

function CreateScoringCategoryForm({ onCloseModal }) {
  const { isCreating, createScoringCategory } = useCreateScoringCategory();
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { errors } = formState;

  const {
    fields: criteriaFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "criteria",
  });

  function onSubmit(data) {
    createScoringCategory(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Critères">
        <div id="criteria">
          <ScoringCriteriaFormList>
            {criteriaFields.map((item, index) => (
              <FormCol
                key={item.id}
                error={errors.criteria?.[index]?.name.message}
              >
                <ScoringCriteriaFormItem>
                  <Input
                    type="text"
                    id={`criteria.${index}.name`}
                    {...register(`criteria.${index}.name`, {
                      required:
                        "Une valeur est requise sinon supprimez la ligne",
                    })}
                    required
                    defaultValue={index}
                  />
                  <ScoringCriteriaFormButtonDelete
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <HiTrash />
                  </ScoringCriteriaFormButtonDelete>
                </ScoringCriteriaFormItem>
              </FormCol>
            ))}
          </ScoringCriteriaFormList>
          <ScoringCriteriaFormButtonAdd
            type="button"
            onClick={() => append({ name: null })}
          >
            Ajouter
          </ScoringCriteriaFormButtonAdd>
        </div>
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

export default CreateScoringCategoryForm;
