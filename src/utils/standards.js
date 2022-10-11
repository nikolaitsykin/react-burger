import PropTypes from 'prop-types';

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
    __v: PropTypes.number
})

export const _BUN = "bun"
export const _SAUCE = "sauce"
export const _MAIN = "main"

export const _URL = "https://norma.nomoreparties.space/api/ingredients";