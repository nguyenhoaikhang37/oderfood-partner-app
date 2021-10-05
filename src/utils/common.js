export const getColorQuantity = (num) => {
  if (typeof num !== 'number') return;

  if (num <= 10) return 'text-red-600';
  if (num <= 50) return 'text-yellow-600';
  if (num > 50) return 'text-green-600';
  else return 'text-dark-900';
};
