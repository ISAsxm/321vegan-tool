import {
  add,
  sub,
  formatDistance,
  parseISO,
  format,
  differenceInDays,
} from "date-fns";
import { fr } from "date-fns/locale";
import { PAGE_SIZE } from "./constants";

/**
 * Returns the date string from today plus num of days
 *
 * @param {Number} numDays: The num of days
 * @param {Boolean} withTime: Flag to set hours or not
 * @return {String} the date string from today plus num of days
 * */
export const fromToday = function (numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
};

/**
 * Returns the date string from today minus num of days
 *
 * @param {Number} numDays: The num of days
 * @param {Boolean} withTime: Flag to set hours or not
 * @return {String} the date string from today minus num of days
 * */
export const beforeToday = function (numDays, withTime = false) {
  const date = sub(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
};

/**
 * Returns the number of full days between the given dates.
 *
 * @param {string} dateStr1: The later date
 * @param {string} dateStr2: The earlier date
 * @return {Number} the number of full days
 * */
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

/**
 * Returns the given date formated according to the given format.
 *
 * @param {string} dateStr: The date to format
 * @param {string} patern: The format
 * @return {String} the given date formated
 * */
export const formatDate = (dateStr, patern = "dd MMM yyyy") =>
  format(new Date(dateStr), patern, { locale: fr });

/**
 * Return the distance between the given date and now in words.
 *
 * @param {string} dateStr: The date to compare to
 * @return {String} the distance in french words
 * */
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
    locale: fr,
  });

/**
 * Return the distance between the given date and now in words.
 *
 * @param {Object} options: optional parameters to get the today date
 * @return {String} the today date
 * */
export const getToday = function (options = {}) {
  const today = new Date();
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

/**
 * Build an object from search params.
 *
 * @param {Array} allowedFilters: allowed filters to 'sanitize' the search params
 * @param {Object} searchParams: the params from react-router-dom
 * @return {Array} filters designed to refine the search
 * */
export const buildQueryFilters = function (allowedFilters, searchParams) {
  return allowedFilters
    .map((f) => {
      const value = searchParams.get(f.field);
      f.value = value ? `${f.operator || ""}${value}` : value;
      return { field: f.field, value: f.value };
    })
    .filter((f) => f.value !== null);
};

/**
 * Build a string from filters and search params.
 *
 * @param {Array} filters: optional additional filters
 * @param {String} sortBy: optional additional sortby, must be constructed as 'field_name-direction'
 * @param {Number} page: optional page for offset
 * @param {Number} size: optional page size for limit
 * @return {String} the url search params formatted
 * */
export const buildURLSearchParams = function (
  filters = [],
  sortBy = "",
  page = null,
  size = null
) {
  const params = new URLSearchParams();
  // FILTER
  if (filters) {
    filters.map((f) => params.append(f.field, f.value));
  }
  // SORT
  if (sortBy) {
    const [field, direction] = sortBy.split("-");
    params.append("sortby", field);
    params.append("direction", direction);
  }
  // PAGINATION
  if (page) {
    const pageSize = size || PAGE_SIZE;
    params.append("page", page);
    params.append("page_size", pageSize);
  }

  return params.toString();
};

/**
 * Return the initials for the given name.
 *
 * @param {string} name: The name to get initials
 * @return {String} the initials
 * */
export const getInitials = function (name) {
  const hasTokens = name.includes(" ");
  return `${name.substring(0, hasTokens ? 1 : 2)}${
    hasTokens ? name.charAt(name.lastIndexOf(" ") + 1) : ""
  }`.toUpperCase();
};
