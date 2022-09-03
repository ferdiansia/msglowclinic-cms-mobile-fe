import { format as dnsFormat } from 'date-fns';

export const formatDate = (
  date: string,
  format: string = 'yyyy-MM-dd HH:mm:ss'
) => {
  return dnsFormat(new Date(date).getTime(), format);
};
