import { html, render } from '../../lib.js'
import { createAnswersList } from './answer.js'

export function createQuestion(question, removeQuestion) {
    let currentQuestion = copyQuestion(question);

    let index = 0;
    let editorActive = false;
    const element = document.createElement('article');
    element.className = "editor-question";
    showView();

    return update;

    function update(newIndex) {
        index = newIndex;
        if (editorActive) {
            showEditor();
        } else {
            showView();
        }
        return element;
    }


    function onEdit() {
        editorActive = true;
        showEditor();
    }
    async function onSave() {
        const formData = new FormData(element.querySelector('form'));
        const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
        console.log(data);
    }

    function onCancel() {
        editorActive = false;
        currentQuestion = copyQuestion(question);
        showView();
    }

    function showView() {
        render(viewTemplate(currentQuestion, index, onEdit, removeQuestion), element)
    }

    function showEditor() {
        render(editorTemplate(currentQuestion, index, onSave, onCancel), element);
    }
}

function copyQuestion(question) {
    const currentQuestion = Object.assign({}, question);
    currentQuestion.answers = currentQuestion.answers.slice();
    return currentQuestion;
}
//            <div class="loading-overlay working"></div>

const editorTemplate = (data, index, onSave, onCancel) => html`

            <div class="layout">
                <div class="question-control">
                    <button @click=${onSave} class="input submit action"><i class="fas fa-check-double"></i>
                        Save</button>
                    <button @click=${onCancel} class="input submit action"><i class="fas fa-times"></i> Cancel</button>
                </div>
                <h3>Question ${index + 1}</h3>
            </div>
            <form>
                <textarea class="input editor-input editor-text" name="text" placeholder="Enter question"
                    .value=${data.text}></textarea>
            
                ${createAnswersList(data, index)}
            </form>
`;

const viewTemplate = (data, index, onEdit, onDelete) => html`
            <div class="layout">
                <div class="question-control">
                    <button @click=${onEdit} class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                    <button @click=${()=> onDelete(index)} class="input submit action"><i class="fas fa-trash-alt"></i>
                        Delete</button>
                </div>
                <h3>Question ${index + 1}</h3>
            </div>
            <div>
                <p class="editor-input">${data.text}</p>
                ${data.answers.map((q, i) => radioViewTemplate(q, data.correctIndex == i))}
            </div>
`;

const radioViewTemplate = (value, isChecked) => html`
<div class="editor-input">
    <label class="radio">
        <input class="input" type="radio" disabled ?checked=${isChecked} />
        <i class="fas fa-check-circle"></i>
    </label>
    <span> ${value}</span>
</div>
`;