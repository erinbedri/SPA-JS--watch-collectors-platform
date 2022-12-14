import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as postService from '../services/postService.js';

const creatorTemplate = (watch) => html`
                    <a href="/edit/${watch._id}" class="btn btn-primary">Edit</a>
                    <a href="/delete/${watch._id}" class="btn btn-danger">Delete</a>
`;

const likeTemplate = (ctx) => html`
                    <a @click=${onClick(ctx)} href="#" class="btn btn-info">Like</a>
`;

const commentTemplate = (ctx) => html`
                        <section>
                            <div class="container p-0">
                                <h4>Add New Comment</h4>
                                    <textarea class="form-control" name="newComment" id="newComment" rows="3"></textarea>
                                    <br>
                                    <a @click=${() => onComment(ctx)} href="#" class="btn btn-info">Comment</a>
                            </div>
                        </section>
`;

const detailsTemplate = (ctx, watch, hasLiked, likes, comments) => html`
        <section class="page-section">
            <div class="container">

                <div class="row">
                    <div class="col-lg-4 ms-auto">
                        <img class="card-img-top" src=${watch.imageUrl} alt="Card image cap">
                    </div>
                    <div class="col-lg-4 me-auto">
                        <h4>Brand: ${watch.brand}</h4>
                        <h4>Model: ${watch.model}</h4>
                        <p><b>Reference Number: </b>${watch.referenceNumber}</p>
                        <p><b>Movement: </b>${watch.movement}</p>
                        <p><b>Year of Production: </b>${watch.year}</p>
                        <p><b>Style: </b>${watch.style}</p>
                        <p><b>Condition: </b>${watch.condition}</p>
                        <p><b>Description: </b>${watch.description}</p>
                        <span class="badge rounded-pill bg-primary">
                            Likes:  <span class="badge badge-light">${likes?likes:0}</span>
                        </span>
                    </div>
                </div>

                <div class="text-center mt-4">
                    ${ctx.user && ctx.user._id == watch._ownerId
                        ? creatorTemplate(watch)
                        : nothing
                    }

                    ${ctx.user && ctx.user._id != watch._ownerId && !hasLiked
                        ? likeTemplate(ctx)
                        : nothing
                    }
                </div>

                <br>

                <section>
                    <div class="container p-0">
                        <h4>Comments</h4>

                        ${comments.length > 0
                            ? comments.map(c => html`<p><b>${c.user.username}: </b>${c.comment}</p>`)
                            : html`<p>No Comments yet!</p>`
                        }

                    </div>
                </section>

                ${ctx.user
                    ? commentTemplate(ctx)
                    : nothing
                }

        </section>
`;

export const detailsView = (ctx) => {  
    let likesPromise = postService.getLikesOfWatch(ctx.params.id);
    let hasLikedPromise = ctx.user ? postService.hasLiked(ctx.user._id, ctx.params.id) : false;
    let commentsPromise = postService.getComments(ctx.params.id);

    Promise.all([likesPromise, hasLikedPromise, commentsPromise]).then(([likes, hasLiked, comments]) => {
        postService.getOne(ctx.params.id)
            .then(watch => {
                ctx.removeLoader();
                ctx.render(detailsTemplate(ctx, watch, hasLiked, likes, comments));
            })
    })
    .catch(err => {
        alert(err);
    })
}

const onClick = (ctx) => {
    postService.like(ctx.params.id)
        .catch(err => {
            alert(err);
        })
}

const onComment = (ctx) => {
    let comment = document.getElementById('newComment');

    postService.comment(ctx.params.id, comment.value, ctx.user)
        .then(() => {
            comment.value = ``; 
            ctx.page.redirect(`/details/${ctx.params.id}`);
        })
        .catch(err => {
            alert(err);
        })
}