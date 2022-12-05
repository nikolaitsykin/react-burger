import PropTypes from "prop-types";

export const ingredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const _BUN = "bun";
export const _SAUCE = "sauce";
export const _MAIN = "main";

export const _MAIN_URL = "https://norma.nomoreparties.space/api/";
export const _ITEMS_URL = `${_MAIN_URL}ingredients`;
export const _ORDER_URL = `${_MAIN_URL}orders`;
export const _EMAIL_RESET_URL = `${_MAIN_URL}password-reset`;
export const _PASSWORD_RESET_URL = `${_MAIN_URL}password-reset/reset`;
export const _REGISTER_URL = `${_MAIN_URL}auth/register`;
export const _LOGIN_URL = `${_MAIN_URL}auth/login`;
export const _LOGOUT_URL = `${_MAIN_URL}auth/logout`;
export const _TOKEN_URL = `${_MAIN_URL}auth/token`;
export const _USER_URL = `${_MAIN_URL}auth/user`;