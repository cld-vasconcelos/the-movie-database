import mockSearchPeopleResults from "../../__mocks__/search-people-results.json";
import mockPerson from "../../__mocks__/person.json";
import mockPersonCredits from "../../__mocks__/person-credits.json";

export async function searchPeople(q, page = 1) {
    return mockSearchPeopleResults
}

export async function getPerson(personId) {
    return mockPerson
}

export async function getPersonCredits(personId) {
    return mockPersonCredits;
}