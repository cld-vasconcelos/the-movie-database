import { ApiGet } from "../service/api.js";

export async function SearchPeople(q, page = 1) {
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
    return ApiGet(route, params);
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