export const formatPriceDisplay = (price) => {
  if (price.toString().length > 6) {
    const beginning = price.toString().slice(0, price.toString().length - 6);
    const ending = price
      .toString()
      .slice(price.toString().length - 6, price.toString().length - 4);
    return beginning + "," + ending;
  } else if (price.toString().length === 6) {
    const ending = price.toString().slice(0, 2);
    return "0," + ending;
  } else if (price.toString().length === 5) {
    const ending = price.toString().slice(0, 1);
    return "0,0" + ending;
  } else if (price.toString().length > 0 && price.toString().length < 5) {
    return "--"; // or >0 or ~0 or >>0
  } else {
    return "error";
  }
};
