import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigationView.js';

const headerElement = document.getElementById('navigation');
const contentElement = document.getElementById('main-content');

const renderContext = (templateResult) => {
    render(templateResult, contentElement);
}

export const renderNavigationMiddleware = (ctx, next) => {
    render(navigationView(ctx), headerElement);
    
    next();
}

export const renderContentMiddleware = (ctx, next) => {
    ctx.render = renderContext;

    next();
}


let navbarElement = document.getElementById('navigation');

navbarElement.addEventListener('click', (e) => {
    let current = e.target;
    let navLinks = document.getElementsByClassName('nav-link');

    for (let link of navLinks) {
        link.classList.remove('text-decoration-underline')
    }
    current.classList.add('text-decoration-underline');
})