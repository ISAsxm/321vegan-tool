export const productsKeys = {
  all: ["products"],
  lists: () => [...productsKeys.all, "list"],
  list: (filters, sortBy, page, size) => [
    ...productsKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  details: () => [...productsKeys.all, "detail"],
  detail: (id) => [...productsKeys.details(), id],
  off: (id, code) => [...productsKeys.details(), id, code],
};
