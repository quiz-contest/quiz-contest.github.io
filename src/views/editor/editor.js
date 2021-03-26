import { createQuestion } from './question.js';
import { html } from '../../lib.js'

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

    ${questionList(questions)}
</section>
`;

const questionList = (questions) => html`
<div class="pad-large alt-page">
    <!--  если ф-я принимает 2 параметра, то при МАП (если в функцию не подавать параметри) в кач-ве 2=-го параметра берется индекс(0,1,2)    а т.к. 2-й параметр ф-ии БУЛЕАН, то при 0 - false, 1- true-->
    ${questions.map((q, i) => createQuestion(q, i + 1, false))}

    <article class="editor-question">
        <div class="editor-input">
            <button class="input submit action">
                <i class="fas fa-plus-circle"></i>
                Add question
            </button>
        </div>
    </article>

</div>
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
]

export async function editorPage(ctx) {
    ctx.render(template(questions))
}


