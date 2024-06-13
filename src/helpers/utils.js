export const displayMoney = (n) => {
  // Check if n is not a valid number
  return `${n}Đ`;
};

// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, original_price) => {
  const discountedPercent = (discountedPrice / original_price) * 100;

  return Math.round(discountedPercent);
};

// Calculate Total Amount
export const calculateTotal = (arr) => {
  const total = arr.reduce((accum, val) => accum + val, 0);

  return total;
};
export function generateRandomString(length) {
  const characters = "123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
