import { html } from '../../lib.js'
import {createList } from './list.js'

const template = (questions) => html`
<section id="editor">

    <header class="pad-large">
        <h1>New quiz</h1>
    </header>

    <div class="pad-large alt-page">
        <form>
            <label class="editor-label layout">
                <span class="label-col">Title:</span>
                <input class="input i-med" type="text" name="title"></label>
            <label class="editor-label layout">
                <span class="label-col">Topic:</span>
                <select class="input i-med" name="topic">
                    <option value="all">All Categories</option>
                    <option value="it">Languages</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Tools and Software</option>
                </select>
            </label>
            <input class="input submit action" type="submit" value="Save">
        </form>
    </div>

    <header class="pad-large">
        <h2>Questions</h2>
    </header>

    ${createList(questions)}
</section>
`;



const questions = [
    {
        text: 'q1',
        answers: ['y', 'n', 'maybe'],
        correctIndex: 0
    },
    {
        text: 'q2',
        answers: ['n', 'maybe', 'y'],
        correctIndex: 1
    }
];

export async function editorPage(ctx) {
    ctx.render(template(questions));
  
}


