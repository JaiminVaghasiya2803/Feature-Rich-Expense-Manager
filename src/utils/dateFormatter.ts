export const formatDate = (date: string): string => {
  const d = new Date(date);

  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
