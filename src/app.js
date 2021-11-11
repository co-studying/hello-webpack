import * as math from "./math.js"
import "./style.css"
import nyancat from './nyancat.png'

console.log(math.sum(1, 2)) // 3

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <img src="${nyancat}" />
    `
})