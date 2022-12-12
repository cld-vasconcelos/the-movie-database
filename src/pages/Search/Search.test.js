import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { setupTestingEnvironment } from "../../helpers/test";

describe("Search", () => {
    test("Submitting an empty search query should not change the page", async () => { 
        const router = await setupTestingEnvironment();
        const searchQuery = "";
        const searchInput = screen.getByRole("searchbox");

        userEvent.type(searchInput, `${searchQuery}{enter}`);
        userEvent.click(searchInput);

        expect(router.state.location.pathname).toBe("/");
        expect(router.state.location.search).toBe("");
    });

    test("Submitting a search query should redirect to the search page", async () => {
        const router = await setupTestingEnvironment();
        const searchQuery = "black";
        const searchInput = screen.getByRole("searchbox");

        userEvent.type(searchInput, `${searchQuery}{enter}`);
        userEvent.click(searchInput);

        await waitFor(() => screen.getByRole("heading", { name: /search 'black'/i }));

        expect(router.state.location.pathname).toBe("/search");
        expect(router.state.location.search).toBe(`?q=${searchQuery}`);

        [/movies/i, /shows/i, /people/i].forEach(x => {
            expect(screen.getByRole("heading", { name: x})).toBeInTheDocument();
        });
    });

    test("Clicking on a movie should go to the movie page", () => { });

    test("Clicking on a show should go to the movie page", () => { });

    test("Clicking on a person should go to the movie page", () => { });
})