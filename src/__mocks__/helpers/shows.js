import mockPopularShowsResponse from "../data/popular-shows.json";
import mockShowResponse from "../data/show.json";
import mockShowCreditsResponse from "../data/show-credits.json";

export function mockShowsHelper() {
    jest.mock("../../helpers/shows", () => ({
        getPopularShows: () => {
            return mockPopularShowsResponse;
        },
        getShow: (_) => {
            return mockShowResponse;
        },
        getShowCredits: (_) => {
            return mockShowCreditsResponse;
        }
    }));
}