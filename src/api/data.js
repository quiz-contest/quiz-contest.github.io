import * as api from './api.js';

const host = 'https://parseapi.back4app.com';

api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implements Application specific request 

const endpoint = '/data/teams';

function createPointer(clazzName, id) {
    return {
        __type: 'Pointer',
        className: clazzName,
        objectId: id
    }
}

function addOwner(object) {
    const result = Object.assign({}, object);
    const userId = sessionStorage.getItem('userId');
    result.owner = createPointer("_User", userId)
    return result;
}

//Quiz Collection
export async function createQuize(quiz) {
    const body = addOwner(quiz);
    return await api.post(host + '/classes/quiz', body)
}

export async function getQuizes() {
    return await api.get(host + '/classes/quiz');
}

export async function getQuizById(id) {
    return await api.get(host + '/classes/quiz/' + id + '?include=owner');
}
export async function updateQuiz(id, quiz) {
    return await api.put(host + '/classes/quiz/' + id, quiz);
}
export async function deleteQuiz(id) {
    return await api.del(host + '/classes/quiz/' + id);
}


// Question Collection
export async function getQuestionsByQuizId(quizId) {
    const query = JSON.stringify({quiz:createPointer('quiz', quizId)});
     const response = await api.get(host + '/classes/question?where='+ encodeURIComponent(query));
     return response.results;
}

export async function createQuestion(quizId, question) {
    const body = addOwner(question);
    body.quiz = createPointer('quiz', quizId);
    return await api.post(host + '/classes/question', body);
}

export async function updateQeustion(id, question) {
    return await api.put(host + '/classes/question/' + id, question);
}
export async function deleteQeustion(id) {
    return await api.del(host + '/classes/question/' + id);
}