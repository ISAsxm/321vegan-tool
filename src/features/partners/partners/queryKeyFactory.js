export const partnersKeys = {
  all: () => ["partners"],
  lists: () => [...partnersKeys.all(), "list"],
  list: (filters, sortBy, page, size) => [
    ...partnersKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...partnersKeys.all(), "detail"],
  detail: (id) => [...partnersKeys.details(), id],
};
