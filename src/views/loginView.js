import { html } from '../../node_modules/lit-html/lit-html.js';

import * as authService from '../services/authService.js';

const loginTemplate = (submitHandler) => html`
            <section class="page-section">
                <div class="container p-0">
                    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-10">Login</h2>

                    <div class="divider-custom">
                            <div class="divider-custom-line"></div>
                            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                            <div class="divider-custom-line"></div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xl-7">

                            <form @submit=${submitHandler}>
                                <div class="form-group">
                                    <label for="loginEmail">Email address</label>
                                    <input type="email" name="email" class="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="loginPassword">Password</label>
                                    <input type="password" name="password" class="form-control" id="loginPassword" placeholder="Enter password" required>
                                </div>
                                <br>
                                <div class="form-group">
                                    <span>If you don't have an account click <a href="/register">here</a></span>
                                </div>
                                <br>
                                <div id="errorMessage" role="alert"></div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>

                        </div>
                    </div>
                    
                </div>
            </section>
`;

export const loginView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        let form = new FormData(e.currentTarget);

        let email = form.get('email').trim();
        let password = form.get('password').trim();

        if (email != '' && password != '') {
            authService.login(email, password)
                .then(res => {
                    if (res.code == 200) {
                        ctx.page.redirect('/');
                    }
                    let errorElement = document.getElementById('errorMessage');
                    errorElement.classList.add('alert')
                    errorElement.classList.add('alert-danger')
                    errorElement.textContent = "Invalid Credentials";
                })
                .catch(err => {
                    alert(err);
                })
        }
    } 
    ctx.render(loginTemplate(submitHandler));
}