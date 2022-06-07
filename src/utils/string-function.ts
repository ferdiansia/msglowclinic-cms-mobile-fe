export const toCapitalize = (data: string): string => {
  return data.trim().replace(/^\w/, (c) => c.toUpperCase());
};
