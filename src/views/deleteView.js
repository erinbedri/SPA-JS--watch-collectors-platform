import * as postService from '../services/postService.js';

export const deleteView = (ctx) => {
    let confirmation = window.confirm('Are you sure you want to delete this post?');

    if (confirmation) {
        postService.del(ctx.params.id)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err);
            })
    }
}