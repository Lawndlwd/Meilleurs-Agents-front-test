export const substring = (number: string) => {
  let result = '';
  const gap_size = 2; //Desired distance between spaces

  while (number.length > 0) {
    // Loop through string
    result = result + ' ' + number.substring(0, gap_size); // Insert space character
    number = number.substring(gap_size); // Trim String
  }
  return result;
};
