export const householdCleanersKeys = {
  all: () => ["household-cleaners"],
  lists: () => [...householdCleanersKeys.all(), "list"],
  list: (filters, sortBy, page, size) => [
    ...householdCleanersKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...householdCleanersKeys.all(), "detail"],
  detail: (id) => [...householdCleanersKeys.details(), id],
  select: () => [...householdCleanersKeys.all(), "select"],
};
