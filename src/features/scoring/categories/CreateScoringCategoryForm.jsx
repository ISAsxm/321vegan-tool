import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useCreateScoringCategory } from "./useCreateScoringCategory";

import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

import { HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const CriteriaList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CriteriaItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 4rem 1.2fr;
  align-items: stretch;
  gap: 0.4rem;
  width: 100%;
`;

const CriterionButtonDelete = styled.button`
  background: none;
  border: none;
  padding: 0.3rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  text-align: center;
  color: var(--color-red-100);
  background-color: var(--color-red-700);
  &:hover {
    background-color: var(--color-red-800);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: currentColor;
  }
`;

const CriterionError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateScoringCategoryForm({ onCloseModal, onCreateOption }) {
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
    // rules: { required: "Ce champ est obligatoire" },
  });

  function onSubmit(data) {
    console.log(data);
    // createScoringCategory(data, {
    //   onSuccess: (data) => {
    //     reset();
    //     onCloseModal?.();
    //     onCreateOption?.({ value: data.id, label: data.name });
    //   },
    // });
  }

  console.log(errors);

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
          <CriteriaList>
            {criteriaFields.map((item, index) => (
              <CriteriaItem key={item.id}>
                <Input
                  type="text"
                  id={`criteria.${index}.name`}
                  {...register(`criteria.${index}.name`, {
                    required: "Ce champ est obligatoire",
                  })}
                  required
                  defaultValue={index}
                />
                <CriterionButtonDelete
                  type="button"
                  onClick={() => remove(index)}
                >
                  <HiTrash />
                </CriterionButtonDelete>
                {errors.criteria?.[index]?.name && (
                  <CriterionError>This can't be empty</CriterionError>
                )}
              </CriteriaItem>
            ))}
          </CriteriaList>
          <Button
            $variation="accent"
            $size="small"
            type="button"
            onClick={() => append({ name: null })}
          >
            Ajouter
          </Button>
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
