import { html } from '../../node_modules/lit-html/lit-html.js';

import * as postService from '../services/postService.js';

const editTemplate = (submitHandler, watch) => html`
            <section class="page-section">
                <div class="container p-0">
                    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-10">Edit Your Watch</h2>

                    <div class="divider-custom">
                            <div class="divider-custom-line"></div>
                            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                            <div class="divider-custom-line"></div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xl-7">

                            <form @submit=${submitHandler}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Brand</label>
                                    <input type="text" name="brand" class="form-control" id="exampleInputEmail1" value=${watch.brand}>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Model</label>
                                    <input type="text" name="model" class="form-control" id="exampleInputPassword1" value=${watch.model}>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Reference Number</label>
                                    <input type="text" name="referenceNumber" class="form-control" id="exampleInputPassword1" value=${watch.referenceNumber}>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Movement</label>
                                    <input type="text" name="movement" class="form-control" id="exampleInputPassword1" value=${watch.movement}>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Year of Production</label>
                                    <input type="text" name="year" class="form-control" id="exampleInputPassword1" value=${watch.year}>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="year">Style</label>
                                    <select class="form-select" name="style" id="styleRegistration">
                                        <option value="Pocket Watch">Pocket Watch</option>
                                        <option value="Railroad Watch">Railroad Watch</option>
                                        <option value="Dress Watch">Dress Watch</option>
                                        <option value="Field Watch">Field Watch</option>
                                        <option value="Aviator Watch">Aviator Watch</option>
                                        <option value="Dive Watch">Dive Watch</option>
                                        <option value="Racing Watch">Racing Watch</option>
                                        <option value="Smart Watch">Smart Watch</option>
                                        <option value="Fashion Watch">Fashion Watch</option>
                                    </select>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Condition</label>
                                    <input type="text" name="condition" class="form-control" id="exampleInputPassword1" value=${watch.condition}>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Description</label>
                                    <input type="text" name="description" class="form-control" id="exampleInputPassword1" value=${watch.description}>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Image</label>
                                    <input type="text" name="imageUrl" class="form-control" id="exampleInputPassword1" value=${watch.imageUrl}>
                                </div>
                                <br>
                                <button type="submit" class="btn btn-primary">Edit</button>
                            </form>

                        </div>
                    </div>
                    
                </div>
            </section>
`;

export const editView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        let form = new FormData(e.currentTarget);

        let editedPost = {
            brand: form.get('brand'),
            model: form.get('model'),
            referenceNumber: form.get('referenceNumber'),
            movement: form.get('movement'),
            year: form.get('year'),
            style: form.get('style'),
            condition: form.get('condition'),
            description: form.get('description'),
            imageUrl: form.get('imageUrl'),
        }

        if (editedPost.brand != '' &&
            editedPost.model != '' &&
            editedPost.referenceNumber != '' &&
            editedPost.movement != '' &&
            editedPost.year != '' &&
            editedPost.style != '' &&
            editedPost.condition != '' &&
            editedPost.description != '' &&
            editedPost.imageUrl != ''
        ) {
                postService.edit(editedPost, ctx.params.id)
                    .then(() => {
                        ctx.page.redirect('/');
                    })
                    .catch(err => {
                        alert(err);
                    })
        }
    }
    postService.getOne(ctx.params.id)
        .then(post => {
            ctx.render(editTemplate(submitHandler, post));
        })
}