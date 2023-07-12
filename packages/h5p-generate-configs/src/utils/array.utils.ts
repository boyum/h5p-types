export const findDuplicates = <Type extends string | boolean | number>(
  array: Array<Type>,
): Array<Type> => {
  return [
    ...new Set(
      array.filter((item, index) => {
        const isDuplicate = array.indexOf(item) !== index;
        return isDuplicate;
      }),
    ),
  ];
};
