import * as request from '../middleware/requester.js';

const baseUrl = 'http://localhost:3030';

const api = {
    getAll: '/data/posts?sortBy=_createdOn%20desc',
    create: '/data/posts',
    getOne: (id) => `/data/posts/${id}`,
    edit: (id) => `/data/posts/${id}`,
    del: (id) => `/data/posts/${id}`,
    getMyPosts: (id) => `/data/posts?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    like: '/data/likes',
    getLikesOfWatch: (id) => `/data/likes?where=watchId%3D%22${id}%22&distinct=_ownerId&count`,
    hasLiked: (userId, watchId) => `/data/likes?where=watchId%3D%22${watchId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    getComments: (watchId) => `/data/comments?where=watchId%3D%22${watchId}%22`,
    comment: '/data/comments'
}

export const getAll = () => request.get(baseUrl + api.getAll);

export const create = (newPost) => request.post(baseUrl + api.create, newPost);

export const getOne = (postId) => request.get(baseUrl + api.getOne(postId));

export const edit = (editedPost, postId) => request.put(baseUrl + api.edit(postId), editedPost);

export const del = (postId) => request.del(baseUrl + api.del(postId)); 

export const getMyPosts = (userId) => request.get(baseUrl + api.getMyPosts(userId));

export const like = (watchId) => request.post(baseUrl + api.like, {watchId});

export const getLikesOfWatch = (watchId) => request.get(baseUrl + api.getLikesOfWatch(watchId));

export const hasLiked = (userId, watchId) => request.get(baseUrl + api.hasLiked(userId, watchId));

export const getComments = (watchId) => request.get(baseUrl + api.getComments(watchId));

export const comment = (watchId, comment, user) => request.post(baseUrl + api.comment, {watchId, comment, user});
