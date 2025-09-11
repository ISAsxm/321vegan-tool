export const scoringCategoriesKeys = {
  all: () => ["scoring", "categories"],
  lists: () => [...scoringCategoriesKeys.all(), "list"],
  list: (filters, sortBy, page, size) => [
    ...scoringCategoriesKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
};
