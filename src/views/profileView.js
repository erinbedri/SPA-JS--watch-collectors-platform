import { html } from '../../node_modules/lit-html/lit-html.js';

import * as postService from '../services/postService.js';

const profileTemplate = (user) => html`
            <section class="page-section">
                <div class="container">
                    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">My Profile</h2>

                    <div class="divider-custom">
                        <div class="divider-custom-line"></div>
                        <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                        <div class="divider-custom-line"></div>
                    </div>

                    <div class="card-body">
                        <h4 class="card-title">Username: ${user.username}</h4>
                        <h4 class="card-title">Email: ${user.email}</h5>
                        <div class="divider-custom-line"></div>
                        <a href="#" class="btn btn-primary">Edit</a>
                    </div>
                </div>
`;

export const profileView = (ctx) => {
    console.log(ctx.user)
    ctx.render(profileTemplate(ctx.user))
}