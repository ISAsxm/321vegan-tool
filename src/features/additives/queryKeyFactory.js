export const additivesKeys = {
  all: ["additives"],
  lists: () => [...additivesKeys.all, "list"],
  list: (filters, sortBy, page, size) => [
    ...additivesKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...additivesKeys.all, "detail"],
  detail: (id) => [...additivesKeys.details(), id],
};
