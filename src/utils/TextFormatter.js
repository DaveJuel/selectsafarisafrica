export const formatPrice = (price, currency = 'RWF') => {
  if (isNaN(price)) return '';

  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const capitalizeText = (text) => {
  if (typeof text !== 'string') return '';

  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}