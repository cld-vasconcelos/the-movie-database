import { ApiGet } from "../service/api.js";

export async function SearchPeople(q) {
    const route = "/search/person";
    const params = [
        { 
            key: "query", 
            value: q 
        },
        { 
            key: "page", 
            value: "1" 
        }
    ];
    return ApiGet(route, params)
        .then(response => response.results.slice(0, 5));
}

export async function GetPerson(personId) {
    const route = `/person/${personId}`;
    const params = [];
    return ApiGet(route, params);
}

export async function GetPersonCredits(personId) {
    const route = `/person/${personId}/combined_credits`;
    const params = [
        {
            key: "page",
            value: "1"
        }
    ];
    return ApiGet(route, params);
}