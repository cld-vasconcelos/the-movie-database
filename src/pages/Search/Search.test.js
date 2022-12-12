import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { setupTestingEnvironment } from "../../helpers/test";

jest.mock("../../helpers/movies.js");
jest.mock("../../helpers/shows.js");
jest.mock("../../helpers/people.js");

async function setupSearch(withQuery) {
    const router = await setupTestingEnvironment();
    const searchQuery = withQuery ? "black" : "";
    const searchInput = screen.getByRole("searchbox");

    userEvent.type(searchInput, `${searchQuery}{enter}`);
    userEvent.click(searchInput);

    if (withQuery) {
        await waitFor(() => screen.getByRole("heading", { name: /search 'black'/i }));
    }

    return router;
}

describe("Search", () => {
    test("Submitting an empty search query should not change the page", async () => {
        const router = await setupSearch(false);

        expect(router.state.location.pathname).toBe("/");
        expect(router.state.location.search).toBe("");
    });

    test("Submitting a search query should redirect to the search page", async () => {
        const router = await setupSearch(true);

        expect(router.state.location.pathname).toBe("/search");
        expect(router.state.location.search).toBe(`?q=black`);

        [/movies/i, /shows/i, /people/i].forEach(x => {
            expect(screen.getByRole("heading", { name: x })).toBeInTheDocument();
        });
    });

    test.each([
        { listIndex: 0, model: { type: "movie", name: /black adam/i } },
        { listIndex: 1, model: { type: "tv", name: /wednesday/i } },
        { listIndex: 2, model: { type: "person", name: /pierce brosnan/i } }
    ])('Clicking on a $model.type search result should go to its page', async ({ listIndex, model }) => {
        const router = await setupSearch(true);

        const list = screen.getAllByRole("list")[listIndex * 2];
        const modelItem = within(list).getAllByRole("listitem")[0];
        userEvent.click(modelItem);

        await waitFor(() => screen.getAllByRole("heading", { name: model.name }));

        expect(router.state.location.pathname).toBe(`/${model.type}/${modelItem.id}`);
    });
})