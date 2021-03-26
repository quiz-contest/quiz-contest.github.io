import { html, render } from '../../lib.js'

export function createQuestion(question, index, edit) {

    const element = document.createElement('article');
    element.className = "editor-question";

    if (edit) {
        render(editorTemplate(question, index), element);
    } else {
        render(viewTemplate(question, index), element);
    }
    return element;
}

//            <div class="loading-overlay working"></div>


const editorTemplate = (data, index) => html`

            <div class="layout">
                <div class="question-control">
                    <button class="input submit action"><i class="fas fa-check-double"></i>
                        Save</button>
                    <button class="input submit action"><i class="fas fa-times"></i> Cancel</button>
                </div>
                <h3>Question ${index}</h3>
            </div>
            <form>
                <textarea class="input editor-input editor-text" name="text" placeholder="Enter question"
                    .value=${data.text}></textarea>
                ${data.answers.map((a, i) => radioEditTemplate(index, i, a, data.correctIndex == i))}
                <div class="editor-input">
                    <button class="input submit action">
                        <i class="fas fa-plus-circle"></i>
                        Add answer
                    </button>
                </div>
            </form>
`;

const radioEditTemplate = (questionIndex, index, value, checked) => html`
    <div class="editor-input">
    
        <label class="radio">
            <input class="input" type="radio" name=${`question-${questionIndex}`} value=${index} ?checked=${checked} />
            <i class="fas fa-check-circle"></i>
        </label>
    
        <input class="input" type="text" name=${`answer-${index}`} .value=${value} />
        <button class="input submit action"><i class="fas fa-trash-alt"></i></button>
    </div>
`;


const viewTemplate = (data, index) => html`
            <div class="layout">
                <div class="question-control">
                    <button class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                    <button class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
                </div>
                <h3>Question ${index}</h3>
            </div>
            <div>
            <p class="editor-input">${data.text}</p>

            ${data.answers.map((a,i) => radioViewTemplate(a, data.correctIndex == i))}

            </div>
`;

const radioViewTemplate = (value, checked) => html`
<div class="editor-input">
    <label class="radio">
        <input class="input" type="radio" disabled ?checked=${checked}/>
        <i class="fas fa-check-circle"></i>
    </label>
    <span> ${value}</span>
</div>
`;