export const errorReportsKeys = {
  all: ["error-reports"],
  lists: () => [...errorReportsKeys.all, "list"],
  list: (filters, sortBy, page, size) => [
    ...errorReportsKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  counts: () => [...errorReportsKeys.all, "count"],
  count: (filters) => [...errorReportsKeys.counts(), filters],
};
