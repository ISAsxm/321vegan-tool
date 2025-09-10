export const scoringCategoriesKeys = {
  all: ["scoring"],
  categories: () => [...scoringCategoriesKeys.all, "categories"],
  lists: () => [...scoringCategoriesKeys.categories(), "list"],
  list: (filters, sortBy, page, size) => [
    ...scoringCategoriesKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...scoringCategoriesKeys.categories(), "detail"],
  detail: (id) => [...scoringCategoriesKeys.details(), id],
  select: () => [...scoringCategoriesKeys.categories(), "select"],
};

export const scoringCriteriaKeys = {
  all: ["scoring"],
  criteria: () => [...scoringCriteriaKeys.all, "criteria"],
  lists: () => [...scoringCriteriaKeys.criteria(), "list"],
  list: (filters, sortBy, page, size) => [
    ...scoringCriteriaKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...scoringCriteriaKeys.criteria(), "detail"],
  detail: (id) => [...scoringCriteriaKeys.details(), id],
};
