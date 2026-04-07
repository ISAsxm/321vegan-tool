export const shopReviewsKeys = {
  all: () => ["shop-reviews"],
  lists: () => [...shopReviewsKeys.all(), "list"],
  list: (filters, sortBy, page, size) => [
    ...shopReviewsKeys.lists(),
    filters,
    sortBy,
    page,
    size,
  ],
  counts: () => [...shopReviewsKeys.all(), "count"],
  count: (filters) => [...shopReviewsKeys.counts(), filters],
};
