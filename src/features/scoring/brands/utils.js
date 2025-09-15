export const getScoreColor = (score) => {
  if (score == -1 || score == null) return "silver";
  if (score >= 1 && score < 3) {
    return "orange";
  } else if (score >= 4) {
    return "green";
  }
  return "red";
};

export const getScoresColor = (score) => {
  if (score == null) return "silver";
  if (score >= 50 && score < 70) {
    return "orange";
  } else if (score >= 70) {
    return "green";
  }
  return "red";
};
