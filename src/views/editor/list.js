import { html, render } from '../../lib.js'
import { createQuestion } from './question.js';


const questionList = (questions, addQuestion) => html`

    <!--  если ф-я принимает 2 параметра, то при МАП (если в функцию не подавать параметри) в кач-ве 2=-го параметра берется индекс(0,1,2)  
      а т.к. 2-й параметр ф-ии БУЛЕАН, то при 0 - false, 1- true-->
    ${questions}

    <article class="editor-question">
        <div class="editor-input">
            <button @click=${addQuestion} class="input submit action">
                <i class="fas fa-plus-circle"></i>
                Add question
            </button>
        </div>
    </article>
 `;

export function createList(questions) {

    const currentQuestions = questions.map(q => createQuestion(q, removeQuestion));
    const element = document.createElement('div');
    element.className = 'pad-large alt-page';
    update();
    return element;

    function addQuestion() {
        currentQuestions.push(createQuestion({
            text: '',
            answers: [],
            correctIndex: 0
        }, removeQuestion));
        update();
    }

    function update() {
        render(questionList(currentQuestions.map((c, i) => c(i)), addQuestion), element);
    }
    
    function removeQuestion(index) {
        const confirmed = confirm("Are you sure to delete this question?");
        if (confirmed) {
            currentQuestions.splice(index, 1);
            update();
        }
    }
}