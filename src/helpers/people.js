import { apiGet } from "../service/api.js";

export async function searchPeople(q, page = 1) {
    const route = "/search/person";
    const params = [
        { 
            key: "query", 
            value: q 
        },
        { 
            key: "page", 
            value: page
        }
    ];
    return apiGet(route, params);
}

export async function getPerson(personId) {
    const route = `/person/${personId}`;
    const params = [];
    return apiGet(route, params);
}

export async function getPersonCredits(personId) {
    const route = `/person/${personId}/combined_credits`;
    const params = [
        {
            key: "page",
            value: "1"
        }
    ];
    return apiGet(route, params);
}