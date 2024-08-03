import Canvas from './canvas.js';
import Home from './patterns/home/index.js';
import Singleton from './patterns/singleton/index.js';
import FactoryMethod from './patterns/factory_method/index.js';

let canvas;

const routes = {
    '/': {
        title:'Home',
        content: Home,
    },
    '/singleton' : {
        title:'Singleton',
        content: Singleton,
    },
    '/factory-method' : {
        title:'Factory Method',
        content: FactoryMethod,
    }
}

const navigateTo = (url) => {
    history.pushState(null, null, url);
    setScene(window.location.pathname);
}

const setScene = (url) => {
    canvas = new Canvas();
    const scene = routes[url];
    console.log(url, scene)
    document.title = scene.title;
    canvas.newScene(scene.content.init, scene.content.loop);
}

window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if(e.target.matches('[data-link]')){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    window.addEventListener('popstate', () => {
        setScene(window.location.pathname);
    });
    setScene(window.location.pathname);
});