import { html } from '../../node_modules/lit-html/lit-html.js';
import { post } from '../middleware/requester.js';

import * as postService from '../services/postService.js';

const currentPage = 1;
const PAGE_SIZE = 3;
const NUMBER_OF_ITEMS = await postService.getNumberOfItems();
const NUMBER_OF_PAGES = Math.ceil(NUMBER_OF_ITEMS / PAGE_SIZE);


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

const homeTemplate = (posts) => html`
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
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>

            </section>

`;

export const homeView = (ctx) => {
    postService.getAll()
        .then(posts => {
            ctx.render(homeTemplate(posts))
        })
        .catch(err => {
            alert(err)
        })
}
