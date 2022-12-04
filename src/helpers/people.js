import { ApiGet } from "../service/api.js";

export async function GetPerson(personId) {
    const route = `/person/${personId}`;
    const params = [];
    return ApiGet(route, params);
}