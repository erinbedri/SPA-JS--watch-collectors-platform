import * as request from '../middleware/requester.js'

const baseUrl = 'http://localhost:3030';

const api = {
    login: '/users/login',
    logout: '/users/logout',
    register: '/users/register'
}

export const getUser = () => {
    let serializedUser = localStorage.getItem('user');

    if (serializedUser) {
        let user = JSON.parse(serializedUser);

        return user;
    }
}

const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export const getToken = () => {
    return getUser()?.accessToken;
}

export const login = (email, password) =>
    request.post(baseUrl + api.login, { email, password })
        .then(user => {
            saveUser(user);

            return user;
        });

export const register = (username, email, password) =>
    request.post(baseUrl + api.register, { username, email, password })
        .then(user => {
            saveUser(user);

            return user;
        });

export const logout = () => {
    fetch(baseUrl + api.logout, { headers: { 'X-Authorization': getToken() } })
        .then(() => {
            localStorage.removeItem('user');
        })
}
