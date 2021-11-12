import * as math from "./math.js"
import "./style.css"
import nyancat from './nyancat.png'

console.log(math.sum(1, 2)) // 3

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#nyancat').innerHTML = `
        <img src="${nyancat}" />
    `
})

console.log(VERSION) // 'v.1.2.3'
console.log(PRODUCTION) // true
console.log(MAX_COUNT) // 999
console.log(api.domain) // 'http://dev.api.domain.com'