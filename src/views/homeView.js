import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as postService from '../services/postService.js';

import { PAGE_SIZE } from '../utils/constants.js';

const postTemplate = (watch) => html`
    <div class="col-md-6 col-lg-4 mb-5">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${watch.imageUrl} alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">${watch.brand}</h4>
                <h5 class="card-title">${watch.model}</h5>
                <a href="/details/${watch._id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
`;

const homeTemplate = (posts, page, pages) => html`
            <section class="page-section">
                <div class="container">
                    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">All Watches</h2>

                    <div class="divider-custom">
                        <div class="divider-custom-line"></div>
                        <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                        <div class="divider-custom-line"></div>
                    </div>

                    <div class="row justify-content-center">
                        ${posts.length > 0
                            ? html`${posts.map(p => postTemplate(p))}`
                            : html`<h6 class="page-section-heading text-center text-secondary mb-10">No posts yet!</h6>`
                        }
                    </div>

                </div>

                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        ${page > 1 
                            ? html`<li class="page-item"><a class="page-link" href="/?page=${page - 1}">Previous</a></li>` 
                            : html`<li class="page-item disabled"><a class="page-link" href="/?page=${page - 1}">Previous</a></li>`}
                        <li class="page-item active"><a class="page-link" href="#">${page + ' of ' + pages}</a></li>
                        ${page < pages ? html`<li class="page-item"><a class="page-link" href="/?page=${page + 1}">Next</a></li>` : nothing}
                    </ul>
                </nav>

            </section>
`;

export const homeView = (ctx) => {
    const query = Object.fromEntries([...(new URLSearchParams(ctx.querystring).entries())]);
    const page = Number(query.page || 1);

    Promise.all([
        postService.getAll(page),
        postService.getCount()
    ])
    .then((values) => {
        let posts = values[0];
        let pages = Math.ceil(values[1] / PAGE_SIZE);
        ctx.render(homeTemplate(posts, page, pages));
    })
    .catch(err => {
        alert(err);
    })
    
}
