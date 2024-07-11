/**
 * Creates a URLSearchParams object from the given parameters.
 *
 * @param params - An object containing key-value pairs of parameters.
 * @returns A URLSearchParams object representing the parameters.
 */
export const createSearchParams = (params: {
  [key: string]: string | number | boolean | null | undefined;
}): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value != null && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams;
};

/**
 * Converts URLSearchParams to an object.
 * @param searchParams - The URLSearchParams object to convert.
 * @returns An object representing the key-value pairs of the URLSearchParams.
 */
export const searchParamsToObject = (searchParams: {
  get: (param: string) => string | null;
}): Record<string, string> => {
  const result: Record<string, string> = {};
  ["page", "name", "status", "gender"].forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      result[param] = value;
    }
  });
  return result;
};
