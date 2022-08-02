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
                        <span class="badge rounded-pill bg-primary">Likes: ${likes}</span>
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
    let likes;
    postService.getLikesOfWatch(ctx.params.id)
        .then(count => {
            likes = count;
        })
        .catch(err => {
            alert(err);
        })

    let hasLiked = false;
    if (ctx.user) {
        postService.hasLiked(ctx.user._id, ctx.params.id)
            .then(result => {
                hasLiked = result;
            })
            .catch(err => {
                alert(err);
            })
    }

    let comments;
    postService.getComments(ctx.params.id)
        .then(result => {
            comments = result;
        })
        .catch(err => {
            alert(err);
        })

    postService.getOne(ctx.params.id)
        .then(watch => {
            ctx.render(detailsTemplate(ctx, watch, hasLiked, likes, comments));
        })
        .catch(err => {
            alert(err);
        })
}

const onClick = (ctx) => {
    let postId = ctx.params.id;

    postService.like(postId)
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