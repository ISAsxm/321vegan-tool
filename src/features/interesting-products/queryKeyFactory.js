export const interestingProductsKeys = {
  all: ["interesting-products"],
  lists: () => [...interestingProductsKeys.all, "list"],
  list: (filters, sortBy, page, size) => [
    ...interestingProductsKeys.lists(),
    { filters, sortBy, page, size },
  ],
  details: () => [...interestingProductsKeys.all, "detail"],
  detail: (id) => [...interestingProductsKeys.details(), id],
};
