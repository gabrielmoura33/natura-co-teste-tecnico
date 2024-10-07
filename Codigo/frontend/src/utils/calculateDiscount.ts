export function calculateDiscountPercentage(
  originalPrice: number,
  price: number,
): string {
  if (originalPrice <= 0 || price >= originalPrice) {
    return ''
  }

  const discount = ((originalPrice - price) / originalPrice) * 100
  return `(-${discount.toFixed(0)}%)`
}
