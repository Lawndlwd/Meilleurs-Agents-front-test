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
  let year = new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
  let month = new Date(date).toLocaleDateString('en-US', { month: 'short' });
  let day = new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
  let hours = new Date(date).getHours();
  let minutes = new Date(date).getMinutes().toString();

  if (+minutes < 10) minutes = `0${minutes}`;

  return `${day} ${month} ${year} at ${hours}:${minutes}`;
};
