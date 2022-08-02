import * as authService from '../services/authService.js';

export const logoutView = (ctx) => {
    authService.logout(ctx);

    ctx.page.redirect('/');
    location.reload();

}