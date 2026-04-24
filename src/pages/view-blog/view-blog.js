import { blogElement } from "@template/view-blog";
console.log(window.location.pathname.split('/'));
const container = document.querySelector('.content-container');
container.append(blogElement);