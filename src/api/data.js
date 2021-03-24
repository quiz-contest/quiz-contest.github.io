import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implements Application specific request 

const endpoint = '/data/teams';

export async function getAllItems() {
    const teams = await api.get(host + endpoint);
    const members = await getMembers(teams.map(t => t._id));
    teams.forEach(t => t.count = members.filter(m => m.teamId == t._id).length);

    return teams;
}

export async function getMyTeams() {
    const userId = sessionStorage.getItem('userId');
    console.log(userId)
    const teamsCreated = await api.get(host + `/data/teams?where=_ownerId%3D%22${userId}%22`);
    const teamsMember = await api.get(host + `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
   const teams = teamsCreated.concat(teamsMember.map(t=>t.team));

        const members = await getMembers(teams.map(t => t._id));
        teams.forEach(t => t.count = members.filter(m => m.teamId == t._id).length);
        return teams
}


export async function getItemById(id) {
    return await api.get(host + endpoint + '/' + id);
}

export async function createItem(item) {
    return await api.post(host + endpoint, item);
}


export async function getMyItems() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function editItem(id, item) {
    return await api.put(host + endpoint + '/' + id, item);
}

export async function deleteItem(id) {
    return await api.del(host + endpoint + '/' + id);
}

export async function requestToJoin(teamId) {
    const body = { teamId };
    return await api.post(host + '/data/members', body)
}

//Members Collection
export async function getRequestsByTeamId(teamId) {
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
}

export async function getMembers(teamsIds) {
    const query = encodeURIComponent(`teamId IN ("${teamsIds.join('", "')}") AND status="member"`);
    return await api.get(host + `/data/members?where=${query}`);
}

export async function cancelMembership(requestId) {
    return await api.del(host + '/data/members/' + requestId)
}

export async function approveMembership(request) {
    const body = {
        status: 'member',
        teamId: request.teamId
    }
    return await api.put(host + '/data/members/' + request._id, body);
}

