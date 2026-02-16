export const partnerCategoriesKeys = {
  all: () => ["partnerCategories"],
  lists: () => [...partnerCategoriesKeys.all(), "list"],
  list: (filters, sortBy, page, size) => [
    ...partnerCategoriesKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...partnerCategoriesKeys.all(), "detail"],
  detail: (id) => [...partnerCategoriesKeys.details(), id],
  select: () => [...partnerCategoriesKeys.all(), "select"],
};
