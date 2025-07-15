export const apiclientsKeys = {
  all: ["apiclients"],
  lists: () => [...apiclientsKeys.all, "list"],
  list: (filters, sortBy, page, size) => [
    ...apiclientsKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
};
