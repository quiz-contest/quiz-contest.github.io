import { html, render } from '../../lib.js'


const radioEditTemplate = (questionIndex, index, value, checked) => html`
    <div class="editor-input">
        <label class="radio">
            <input class="input" type="radio" name=${`question-${questionIndex}`} value=${index} ?checked=${checked} />
            <i class="fas fa-check-circle"></i>
        </label>
        <input class="input" type="text" name=${`answer-${index}`} .value=${value} />
        <button data-index=${index} class="input submit action"><i class="fas fa-trash-alt"></i></button>
    </div>
`;

export function createAnswersList(data, questionIndex) {
    const answers = data.answers;
    const element = document.createElement('div');
    element.addEventListener('click', onDelete);
    element.addEventListener('change', onChange)
    update();

    return element;

    function update() {
        render(html`
            ${answers.map((a, i) => radioEditTemplate(questionIndex, i, a, data.correctIndex == i))}
            
            <div class="editor-input">
                <button @click=${addAnswer} class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add answer
                </button>
            </div>`,
            element
        );
    }

    function onChange(ev) {
        if (ev.target.getAttribute('type') == 'text') {
            const index = Number(ev.target.name.split("-")[1]);
            answers[index] = ev.target.value || '';
        } else {
            data.correctIndex = Number(e.target.value)
        }
    }

    function addAnswer(ev) {
        ev.preventDefault();
        answers.push('');
        update();
    }

    function onDelete(ev) {
        ev.preventDefault();
        let target = ev.target;
        while (target != element && target.tagName != 'BUTTON') {
            target = target.parentNode;
        }
        const index = target.dataset.index;
        if (index != undefined) {
            answers.splice(index, 1);
            update();
        }
    }
}