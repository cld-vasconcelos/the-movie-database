import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { setupTestingEnvironment } from "../../helpers/test";

async function setupSearch(withQuery) {
    const router = await setupTestingEnvironment();
    const searchQuery = withQuery ? "black" : "";
    const searchInput = screen.getByRole("searchbox");

    userEvent.type(searchInput, `${searchQuery}{enter}`);
    userEvent.click(searchInput);

    if(withQuery) {
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
        {listIndex: 0, modelType: "movie"},
        {listIndex: 1, modelType: "tv"},
        {listIndex: 2, modelType: "person"}
      ])('Clicking on a $modelType search result should go to its page', async ({listIndex, modelType}) => {
        const router = await setupSearch(true);

        const list = screen.getAllByRole("list")[listIndex * 2];
        const model = within(list).getAllByRole("listitem")[0];
        userEvent.click(model);

        const modelId = model.id;
        const modelName = model.getElementsByClassName("search-result-name")[0].textContent;
    
        await waitFor(() => screen.getByRole("heading", { name: modelName }));

        expect(router.state.location.pathname).toBe(`/${modelType}/${modelId}`);
      });
})