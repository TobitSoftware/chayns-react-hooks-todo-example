// It's useful to define several functions for data interactions like get, post, update ... and split them in different directories
function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos'));
}

export default getTodosFromLocalStorage;
