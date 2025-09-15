import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useUpdateScoringCategory } from "./useUpdateScoringCategory";
import {
  ScoringCriteriaFormList,
  ScoringCriteriaFormItem,
  ScoringCriteriaFormButtonDelete,
  ScoringCriteriaFormButtonAdd,
} from "@/features/scoring/criteria/ScoringCriteriaFormList";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import FormCol from "@/ui/FormCol";
import Input from "@/ui/Input";

import { HiTrash } from "react-icons/hi2";

function UpdateScoringCategoryForm({ categoryToUpdate, onCloseModal }) {
  const { hasAccess } = useCurrentUserContext();
  const { id: updateId, ...updateValues } = categoryToUpdate;
  const [criteriaToDelete, setCriteriaToDelete] = useState([]);
  const criteria = categoryToUpdate.criteria.map((criterion) => ({
    id: criterion.id,
    name: criterion.name,
    category_id: updateId,
  }));
  const { isUpdating, updateScoringCategory } = useUpdateScoringCategory();
  const { register, formState, handleSubmit, reset, control, getValues } =
    useForm({
      defaultValues: { ...updateValues, criteria: criteria },
    });
  const { errors } = formState;

  const {
    fields: criteriaFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "criteria",
  });

  function checkCanDelete(index) {
    if (index <= 0) return false;
    const idToCheck = getValues(`criteria.${index}.id`);
    const criterionToCheck = criteria.find(
      (criterion) => criterion.id === idToCheck
    );
    return !criterionToCheck || hasAccess("admin");
  }

  function handleRemove(index) {
    const idToDelete = getValues(`criteria.${index}.id`);
    const criterionToDelete = criteria.find(
      (criterion) => criterion.id === idToDelete
    );
    if (criterionToDelete)
      setCriteriaToDelete((crit) => [
        ...crit,
        { ...criterionToDelete, category_id: null },
      ]);
    remove(index);
  }

  function onSubmit(data) {
    updateScoringCategory(
      {
        newData: {
          ...data,
          criteria: [...data.criteria, ...criteriaToDelete],
        },
        id: updateId,
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
                      required: `${
                        index > 0
                          ? "Une valeur est requise sinon supprimez la ligne"
                          : "Ce champ est obligatoire"
                      } `,
                    })}
                    required
                    defaultValue={index}
                  />
                  {checkCanDelete(index) && (
                    <ScoringCriteriaFormButtonDelete
                      type="button"
                      onClick={() => handleRemove(index)}
                    >
                      <HiTrash />
                    </ScoringCriteriaFormButtonDelete>
                  )}
                </ScoringCriteriaFormItem>
              </FormCol>
            ))}
          </ScoringCriteriaFormList>
          <ScoringCriteriaFormButtonAdd
            type="button"
            onClick={() =>
              append({ id: null, name: null, category_id: updateId })
            }
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
