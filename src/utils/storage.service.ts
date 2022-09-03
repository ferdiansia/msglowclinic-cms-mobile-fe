export const _removeAuthenticate = () => {
  localStorage.removeItem('token');
};

export const _addAuthenticate = (token: string) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const _getAuthenticate = () => {
  return JSON.parse(localStorage.getItem('token'));
};
