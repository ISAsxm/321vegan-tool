export const productCategoriesKeys = {
  all: () => ["productCategories"],
  lists: () => [...productCategoriesKeys.all(), "list"],
  list: (filters, sortBy, page, size) => [
    ...productCategoriesKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...productCategoriesKeys.all(), "detail"],
  detail: (id) => [...productCategoriesKeys.details(), id],
};
