import { getScoreColor } from "./utils";

import Ratings from "@/ui/Ratings";
import Tag from "@/ui/Tag";

import styled from "styled-components";

const StyledBrandScores = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CategoryRow = styled.div`
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--color-grey-100);
`;

const CriteriaBox = styled.div`
  margin-block-start: 0.75rem;
  margin-block-end: 0.75rem;
  & > div:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const CriteriaRow = styled.div`
  padding: 1rem 2rem;
`;

const ScoreBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.2fr 0.5fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
`;

const ScoreDescription = styled.div`
  line-height: 1.1;
  font-size: 1.1rem;
  grid-column: 2/-1;
`;

const RatingRow = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.5rem;
  font-size: 3rem;
`;

function BrandScores({ categories, scores }) {
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

  function buildCriterionRow(criterion) {
    const score = getCheckedDefaultValue(criterion.id);
    const scoreColor = getScoreColor(score);
    return (
      <CriteriaRow key={criterion.id}>
        <ScoreBox>
          {criterion.name}
          <RatingRow>
            <Ratings
              defaultValue={score}
              name={`criterion-${criterion.id}`}
              disabled={true}
            >
              {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                <Ratings.Rating
                  key={`score-${criterion.id}-${i}`}
                  name={`score-${criterion.id}-${i}`}
                  value={i}
                  disabled={true}
                  color={i === 0 ? "red" : "brand"}
                />
              ))}
            </Ratings>
          </RatingRow>
          <Tag type={scoreColor}>{score >= 0 ? `${score}/5` : "N/A"}</Tag>
          <ScoreDescription>
            {getDescriptionDefaultValue(criterion.id)}
          </ScoreDescription>
        </ScoreBox>
      </CriteriaRow>
    );
  }

  if (categories.length <= 0) return <Empty message="Aucune catégories" />;

  return (
    <StyledBrandScores>
      {categories.map((category) => (
        <CategoryRow key={category.id}>
          {category.name}
          <CriteriaBox>
            {category.criteria.map((criterion) => buildCriterionRow(criterion))}
          </CriteriaBox>
        </CategoryRow>
      ))}
    </StyledBrandScores>
  );
}

export default BrandScores;
