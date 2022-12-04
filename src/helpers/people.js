import { ApiGet } from "../service/api.js";

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