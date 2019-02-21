import LOCALSTORAGE_KEY from '../../constants/localstorage';

// It's useful to define several functions for data interactions like get, post, update ... and split them in different directories
function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
}

export default getTodosFromLocalStorage;
