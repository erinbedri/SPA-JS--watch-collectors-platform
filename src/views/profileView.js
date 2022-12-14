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
                        <div class="col-lg-12 col-xl-4">
            
                            <img src="../../../assets/img/portfolio/profile.JPG" style="max-width:50%;"
                                class="rounded mx-auto d-block" alt="Profile Picture">
                            <h5 class="card-title row justify-content-center">You registered ${watchesCount} watches so far!</h5>
                            <br>
            
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

                            <div class="text-center mt-4">
                                <a href="#" class="btn btn-primary disabled">Edit</a>
                            </div>
            
                        </div>
            
                    </div>
                </div>
`;

export const profileView = (ctx) => {
    postService.getMyPosts(ctx.user._id)
        .then(watches => {
            ctx.removeLoader();
            ctx.render(profileTemplate(ctx.user, watches.length))
        })
        .catch(err => {
            alert(err)
        })
}

