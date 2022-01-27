export const dateConverter = (date: Date): string => {
  let response = new Date(date).toLocaleDateString();
  const isLessThanWeek = new Date(date).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7;
  const isItToday = new Date(date).getTime() > Date.now() - 1000 * 60 * 60 * 24;
  const isItYesterday =
    Date.now() - 1000 * 60 * 60 * 24 > new Date(date).getTime() &&
    new Date(date).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 2;

  if (isLessThanWeek) {
    response = new Date(date).toLocaleDateString('fe-FR', { weekday: 'long' });
  }
  if (isItToday) {
    response = `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
  }
  if (isItYesterday) {
    response = 'Yesterday';
  }
  return response;
};

export const fullDate = (date: Date): string => {
  const year = new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
  const month = new Date(date).toLocaleDateString('en-US', { month: 'short' });

  const day = new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();

  return `${day} ${month} ${year} at ${hours}:${minutes}`;
};
