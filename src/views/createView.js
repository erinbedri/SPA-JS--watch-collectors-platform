import { html } from '../../node_modules/lit-html/lit-html.js';

import * as postService from '../services/postService.js';

const createTemplate = (submitHandler) => html`
            <section class="page-section">
                <div class="container p-0">
                    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-10">Add New Watch</h2>
            
                    <div class="divider-custom">
                        <div class="divider-custom-line"></div>
                        <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                        <div class="divider-custom-line"></div>
                    </div>
            
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xl-7">
            
                            <form @submit=${submitHandler}>
                                <div class="form-group">
                                    <label for="brand">Brand</label>
                                    <input type="text" name="brand" class="form-control" id="brandRegistration"
                                        placeholder="e.g. Rolex" required>
                                </div>
                                <br>
            
                                <div class="form-group">
                                    <label for="model">Model</label>
                                    <input type="text" name="model" class="form-control" id="modelRegistration"
                                        placeholder="e.g. Submariner" required>
                                </div>
                                <br>
            
                                <div class="form-group">
                                    <label for="referenceNumber">Reference Number</label>
                                    <input type="text" name="referenceNumber" class="form-control" id="referenceRegistration"
                                        placeholder="e.g. 6536-1" required>
                                </div>
                                <br>
            
                                <div class="form-group">
                                    <label for="movement">Movement</label>
                                    <input type="text" name="movement" class="form-control" id="movementRegistration"
                                        placeholder="e.g. Caliber 1030" required>
                                </div>
                                <br>
            
                                <div class="form-group">
                                    <label for="year">Year of Production</label>
                                    <input type="number" name="year" class="form-control" id="yearRegistration"
                                        placeholder="e.g. 1954" required>
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
                                    <label for="condition">Condition</label>
                                    <input type="text" name="condition" class="form-control" id="conditionRegistration"
                                        placeholder="e.g. NOS condition" required>
                                </div>
                                <br>
            
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <textarea class="form-control" class="form-control" name="description"
                                        id="descriptionRegistration" rows="3"></textarea>
                                </div>
                                <br>
            
                                <div class="form-group">
                                    <label for="imageUrl">Image</label>
                                    <input type="text" name="imageUrl" class="form-control" id="imageRegistration"
                                        placeholder="type in the URL of the image" required>
                                </div>
                                <br>
            
                                <button type="submit" class="btn btn-primary">Add</button>
                            </form>
            
                        </div>
                    </div>
            
                </div>
            </section>
`;

export const createView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        let form = new FormData(e.currentTarget);

        let newPost = {
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

        if (newPost.brand != '' &&
            newPost.model != '' &&
            newPost.referenceNumber != '' &&
            newPost.movement != '' &&
            newPost.year != '' &&
            newPost.style != '' &&
            newPost.condition != '' &&
            newPost.description != '' &&
            newPost.imageUrl != ''
        ) {
            postService.create(newPost)
                .then(() => {        
                    ctx.page.redirect('/');
                })
                .catch(err => {
                    alert(err);
                })
        }
    }
    ctx.removeLoader();
    ctx.render(createTemplate(submitHandler));
}