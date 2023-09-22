export const removeDuplicatesFromArray = (arr) => {
  // Create an empty Set to store unique strings
  const uniqueStrings = new Set();

  // Use filter to iterate through the array and keep only unique strings
  const uniqueArray = arr.filter((str) => {
    if (!uniqueStrings.has(str)) {
      uniqueStrings.add(str); // Add the string to the Set
      return true; // Keep the string in the filtered array
    }
    return false; // Skip duplicate strings
  });

  return uniqueArray;
};
