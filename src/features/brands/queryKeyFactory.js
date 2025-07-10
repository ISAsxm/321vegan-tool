export const brandsKeys = {
  all: ["brands"],
  lists: () => [...brandsKeys.all, "list"],
  list: (filters, sortBy, page, size) => [
    ...brandsKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...brandsKeys.all, "detail"],
  detail: (id) => [...brandsKeys.details(), id],
  select: () => [...brandsKeys.all, "select"],
};
