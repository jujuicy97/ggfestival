// api/LocalStorage.js
export const saveUserInfo = (userData) => {
  localStorage.setItem('userInfo', JSON.stringify(userData));
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

export const removeUserInfo = () => {
  localStorage.removeItem('userInfo');
};