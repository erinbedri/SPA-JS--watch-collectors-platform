import { html } from '../../node_modules/lit-html/lit-html.js';

import * as postService from '../services/postService.js';

const postTemplate = (watch) => html`
    <div class="col-md-6 col-lg-4 mb-5">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${watch.imageUrl} alt=${watch.brand}>
            <div class="card-body">
                <h4 class="card-title">${watch.brand}</h4>
                <h5 class="card-title">${watch.model}</h5>
                <a href="/details/${watch._id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
`;

const catalogTemplate = (user, posts) => html`
            <section class="page-section">
                <div class="container">
                    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">My Watch Collection</h2>         

                    <div class="divider-custom">
                        <div class="divider-custom-line"></div>
                        <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                        <div class="divider-custom-line"></div>
                    </div>

                    <div class="row justify-content-center">
                        ${user && posts.length > 0
                            ? html`${posts.map(p => postTemplate(p))}`
                            : html`<h6 class="page-section-heading text-center text-secondary mb-10">No posts yet!</h6>`
                        }
                    </div>

                </div>

            </section>

`;

export const catalogView = (ctx) => {
    postService.getMyPosts(ctx.user._id)
        .then(posts => {
            ctx.removeLoader();
            ctx.render(catalogTemplate(ctx.user, posts))
        })
        .catch(err => {
            alert(err);
        })
}