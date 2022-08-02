import { html } from '../../node_modules/lit-html/lit-html.js';

import * as authService from '../services/authService.js';

const registerTemplate = (submitHandler) => html`
            <section class="page-section">
                <div class="container p-0">
                    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-10">Register</h2>

                    <div class="divider-custom">
                            <div class="divider-custom-line"></div>
                            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                            <div class="divider-custom-line"></div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xl-7">

                            <form @submit=${submitHandler} id="registrationForm">
                                <div class="form-group">
                                    <label for="registerEmail">Username</label>
                                    <input type="text" name="username" class="form-control" id="registerUsername" aria-describedby="emailHelp" placeholder="Enter username" required>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="registerEmail">Email address</label>
                                    <input type="email" name="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="registerPassword">Password</label>
                                    <input type="password" name="password" class="form-control" id="registerPassword" placeholder="Enter Password" required>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="registerRePassword">Repeat Password</label>
                                    <input type="password" name="repeatPassword" class="form-control" id="registerRePassword" placeholder="Repeat Password" required>
                                    <div class="invalid-feedback">Passwords do not match</div>
                                </div>
                                <br>
                                <div class="form-group">
                                    <span>If you already have a profile, click <a href="/login">here</a></span>
                                </div>
                                <br>

                                <div id="errorMessage" role="alert"></div>

                                <button type="submit" class="btn btn-primary">Register</button>
                            </form>

                        </div>
                    </div>
                    
                </div>
            </section>
`;

export const registerView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        let form = new FormData(e.currentTarget);

        let username = form.get('username').trim();
        let email = form.get('email').trim();
        let password = form.get('password').trim();
        let repassword = form.get('repeatPassword').trim();

        if (password !== repassword) {
            document.getElementById('registerRePassword').classList.add('is-invalid');
        }

        if (username != '' && email != '' && password != '' && password == repassword) {
            authService.register(username, email, password)
                .then((res) => {
                    if (res.code == 200) {
                        ctx.page.redirect('/');
                    }

                    let errorElement = document.getElementById('errorMessage');
                    errorElement.classList.add('alert');
                    errorElement.classList.add('alert-danger');
                    errorElement.textContent = res.message;

                    document.getElementById('registrationForm').reset();
                })
                .catch(err => {
                    alert(err);
                })
        }
    } 
    ctx.render(registerTemplate(submitHandler));
}