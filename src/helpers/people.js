import api from "../service/api.js";

export async function searchPeople(q, page = 1) {
    const route = "/search/person";
    const params = {
        query: q,
        page
    };
    return api.get(route, { params }).then((response) => response.data);
}

export async function getPerson(personId) {
    const route = `/person/${personId}`;
    return api.get(route).then((response) => response.data);
}

export async function getPersonCredits(personId) {
    const route = `/person/${personId}/combined_credits`;
    return api.get(route).then((response) => response.data);
}