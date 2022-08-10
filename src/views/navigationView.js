import {html, nothing} from '../../node_modules/lit-html/lit-html.js';

const userView = html`
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/catalog">My Watches</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/create">Add Watch</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/profile">My Profile</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/logout">Logout</a></li>
`;

const guestView = html`
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/login">Login</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/register">Register</a></li>
`;

export const navigationView = (ctx) => html`
        <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="/">Chronos</a>
                <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">

                        ${ctx.user
                                ? html`<p class="nav-link py-3 px-0 px-lg-3">Welcome, ${ctx.user.username ?ctx.user.username :ctx.user.email}!<p></li>`
                                : nothing
                        }

                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/">Dashboard</a></li>

                        ${ctx.user
                            ? userView
                            : guestView
                        }

                    </ul>
                </div>
            </div>
        </nav>
`;