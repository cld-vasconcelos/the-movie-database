import mockPopularShows from "../../__mocks__/popular-shows.json";
import mockSearchShowsResult from "../../__mocks__/search-shows-resullts.json";
import mockShow from "../../__mocks__/show.json";
import mockShowCredits from "../../__mocks__/show-credits.json";

export async function getPopularShows(page = 1) {
    return mockPopularShows
}

export async function searchShows(q, page = 1) {
    return mockSearchShowsResult;
}

export async function getShow(showId) {
    return mockShow;
}

export async function getShowCredits(showId) {
    return mockShowCredits;
}