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

                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-xl-7">

                            <div class="form-group">
                                    <label for="email">Username</label>
                                    <input type="text" name="username" class="form-control" id="username" aria-describedby="emailHelp" placeholder=${user.username} readonly>
                            </div>
                            <br>
                            <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder=${user.email} readonly>
                            </div>
                            <br>
                            <a href="#" class="btn btn-primary">Edit</a>
                        </div>

                    </div>
                </div>
`;

export const profileView = (ctx) => {
    console.log(ctx.user)
    ctx.render(profileTemplate(ctx.user))
}