import { Controller, useForm, useFieldArray } from "react-hook-form";

import { useManageBrandScores } from "./useManageBrandScores";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import FormCol from "@/ui/FormCol";
import Textarea from "@/ui/Textarea";
import Ratings from "@/ui/Ratings";

import styled from "styled-components";

const CategoryRow = styled.div`
  grid-column: 2/-1;

  & > div:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const CriterionRow = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const RatingRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 3rem;
`;

const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResetBox = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
`;

function ManageBrandScoresForm({
  brandId,
  categories,
  scores = [],
  onCloseModal,
}) {
  const { isManaging, manageBrandScores } = useManageBrandScores();
  const criteriaDefaultValue = categories.reduce(
    (acc, { criteria }) => [
      ...acc,
      ...criteria.reduce(
        (acc2, { id }) => [
          ...acc2,
          {
            criterion_id: id,
            score: getCheckedDefaultValue(id),
            description: getDescriptionDefaultValue(id),
          },
        ],
        []
      ),
    ],
    []
  );
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scores: criteriaDefaultValue,
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "scores",
  });
  const watchFieldArray = watch("scores");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  function onSubmit(data) {
    const filteredData = filterData(data.scores);
    manageBrandScores(
      { data: filteredData, id: brandId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function filterData(data) {
    return data.filter((row) => {
      if (parseInt(row.score) < 0) {
        return !!getBrandScore(row.criterion_id);
      }
      return true;
    });
  }

  function getBrandScore(criterionId) {
    return scores.find((score) => score.criterion_id === criterionId);
  }

  function getCheckedDefaultValue(criterionId) {
    const score = getBrandScore(criterionId)?.score;
    return score === undefined ? -1 : score;
  }

  function getDescriptionDefaultValue(criterionId) {
    return getBrandScore(criterionId)?.description || "";
  }

  function buildCriteriaRow(criterion) {
    const fieldItem = controlledFields.find(
      (item) => item.criterion_id === criterion.id
    );
    if (!fieldItem) return null;
    const index = controlledFields.findIndex(
      (item) => item.criterion_id === criterion.id
    );
    return (
      <FormCol
        key={fieldItem.id}
        label={criterion.name}
        error={errors.scores?.[index]?.score.message}
      >
        <CriterionRow id={`criterion-row-${criterion.id}`}>
          <RatingBox>
            <RatingRow>
              <Controller
                name={`scores.${index}.score`}
                control={control}
                rules={{
                  validate: (value) =>
                    watchFieldArray[index].description
                      ? parseInt(value) >= 0 ||
                        "Le score est requis, sinon, veuillez supprimer les valeurs"
                      : true,
                }}
                render={({ field }) => (
                  <Ratings
                    id={field.name}
                    name={field.name}
                    onChange={field.onChange}
                    ref={field.ref}
                    required={false}
                    defaultValue={field.value}
                  >
                    {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                      <Ratings.Rating
                        key={`score-${criterion.id}-${i}`}
                        name={`score-${criterion.id}-${i}`}
                        value={i}
                        disabled={false}
                        color={i === 0 ? "red" : "brand"}
                      />
                    ))}
                  </Ratings>
                )}
              />
            </RatingRow>

            <Controller
              name={`scores.${index}.description`}
              control={control}
              render={({ field }) => (
                <Textarea {...field} rows={1} required={false} />
              )}
            />
          </RatingBox>
          <ResetBox>
            {(watchFieldArray[index].score >= 0 ||
              watchFieldArray[index].description) && (
              <Button
                type="button"
                $variation="danger"
                $size="small"
                onClick={() =>
                  setValue(`scores.${index}`, {
                    criterion_id: criterion.id,
                    score: -1,
                    description: "",
                  })
                }
                disabled={isManaging}
              >
                Supprimer les valeurs
              </Button>
            )}
          </ResetBox>
        </CriterionRow>
      </FormCol>
    );
  }

  if (!categories.length > 0) return <Empty message="Aucune catégories" />;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      {categories.map((category) => (
        <FormRow label={category.name} key={category.id}>
          <CategoryRow id={`category-${category.id}`}>
            {category.criteria.map((criterion) => buildCriteriaRow(criterion))}
          </CategoryRow>
        </FormRow>
      ))}

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isManaging}
        >
          Annuler
        </Button>
        <Button disabled={isManaging} onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </Button>
      </FormRow>
    </Form>
  );
}

export default ManageBrandScoresForm;
