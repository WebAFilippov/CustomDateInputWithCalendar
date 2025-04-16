export const isValidDate = (value: string) => {
  const reg = /[^0-9]/g;

  const splitedDate = value.split('.');

  if (splitedDate.length === 3 && value.length === 10) {
    const [day, month, year] = splitedDate;
    
  } else {
    return false;
  }
  // const formatedValue = value.replace(reg, '');

  // return formatedValue.length === 8;
};
