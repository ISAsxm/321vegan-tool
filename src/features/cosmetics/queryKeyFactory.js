export const cosmeticsKeys = {
  all: ["cosmetics"],
  lists: () => [...cosmeticsKeys.all, "list"],
  list: (filters, sortBy, page, size) => [
    ...cosmeticsKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...cosmeticsKeys.all, "detail"],
  detail: (id) => [...cosmeticsKeys.details(), id],
  select: () => [...cosmeticsKeys.all, "select"],
};
