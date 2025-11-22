export const reformedQueryDate = (date: string) => {
  const inputDate = new Date(date);
  const timezoneOffset = new Date().getTimezoneOffset() * -60000;
  const timezoneOffsetStr = new Date(timezoneOffset).toISOString().slice(11, 16);
  const outputDateStr = `${inputDate.getFullYear()}-${String(
    inputDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}T${String(
    inputDate.getHours(),
  ).padStart(2, '0')}:${String(inputDate.getMinutes()).padStart(
    2,
    '0',
  )}:${String(inputDate.getSeconds()).padStart(2, '0')}.${String(
    inputDate.getMilliseconds(),
  ).padStart(3, '0')}${timezoneOffsetStr}`;
  return outputDateStr;
};

export const formatDateToYYYYMMDD = (date: Date | undefined): string => {
    if (!date) {
        return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
