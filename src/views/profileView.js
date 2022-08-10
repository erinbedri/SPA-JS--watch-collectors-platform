import { html } from '../../node_modules/lit-html/lit-html.js';

import * as postService from '../services/postService.js';

const profileTemplate = (user, watchesCount) => html`
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
                                <label for="username">Username</label>
                                <input type="text" name="username" class="form-control" id="username" aria-describedby="emailHelp"
                                    placeholder=${user.username} readonly>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"
                                    placeholder=${user.email} readonly>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="countWatches">User Watches</label>
                                <input type="text" name="countWatches" class="form-control" id="countWatches"
                                    aria-describedby="emailHelp" placeholder=${watchesCount} readonly>
                            </div>
                            <br>
                            <a href="#" class="btn btn-primary disabled">Edit</a>
            
                        </div>
            
                    </div>
                </div>
`;

export const profileView = (ctx) => {
    postService.getMyPosts(ctx.user._id)
        .then(watches => {
            ctx.render(profileTemplate(ctx.user, watches.length))
        })
        .catch(err => {
            alert(err)
        })
}

