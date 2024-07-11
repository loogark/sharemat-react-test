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
