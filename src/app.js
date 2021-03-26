import * as api from "./api/data.js"
import { render, page } from "./lib.js"

import { editorPage } from "./views/editor/editor.js"

const main = document.getElementById('content')

page('/', decorateContex, editorPage);

page.start();
function decorateContex(ctx,next) {
    ctx.render = (content) => render(content, main);
    next();
}

