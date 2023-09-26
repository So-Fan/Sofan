export const formatCurrentBalance = (balance, setter) => {
  if (balance) {
    const balanceString = balance.toString();
    const balanceStringLength = balanceString.length;

    if (balanceStringLength > 6) {
      const balanceStringFirstPart = balanceString.slice(
        0,
        balanceStringLength - 6
      );
      const balanceStringSecondPart = balanceString.slice(
        balanceStringLength - 6,
        balanceStringLength
      );
      const concat = balanceStringFirstPart + "." + balanceStringSecondPart;
      if (setter) {
        setter(concat);
      }
      return concat;
    } else if (6 >= balanceStringLength && balanceStringLength > 0) {
      const balanceStringAddPart = "0.00000";
      const concat =
        balanceStringAddPart.slice(0, 8 - balanceStringLength) + balanceString;
      if (setter) {
        setter(concat);
      }
      return concat;
    } else {
      return false;
    }
  }
};
