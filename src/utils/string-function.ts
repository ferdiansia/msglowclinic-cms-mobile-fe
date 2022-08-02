export const toCapitalize = (data: string, separator: string = "-"): string => {
  let result: string = ""
  const dataArr = data.split(separator)
  dataArr.forEach((v, i) => {
    result += v.trim().replace(/^\w/, (c) => c.toUpperCase()).replaceAll("-", " ");

    if (i !== dataArr.length - 1) {
      result += " "
    }
  })
  return result
};
