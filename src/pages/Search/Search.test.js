import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../../routes";
import { mockMoviesHelper } from "../../__mocks__/helpers/movies";
import { mockShowsHelper } from "../../__mocks__/helpers/shows";

function setupMocks() {
    mockMoviesHelper();
    mockShowsHelper();
}

async function setup() {
    setupMocks();

    const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("heading", { name: /the movie database/i }));

    return router;
}

describe("Search", () => {
    test("Submitting an empty search query should not change the page", () => { });

    test("Submitting a search query should redirect to the search page", async () => {
        const router = await setup();
        const searchQuery = "black";
        const searchInput = screen.getByRole("searchbox");

        userEvent.type(searchInput, `${searchQuery}{enter}`);
        userEvent.click(searchInput);

        await waitFor(() => screen.getByRole("heading", { name: /search 'black'/i }));

        expect(router.state.location.pathname).toBe("/search");
        expect(router.state.location.search).toBe(`?q=${searchQuery}`);

        await [/movies/i, /shows/i, /people/i].forEach(x => {
            expect(screen.getByRole("heading", { name: x})).toBeInTheDocument();
        });
    });

    test("Clicking on a movie should go to the movie page", () => { });

    test("Clicking on a show should go to the movie page", () => { });

    test("Clicking on a person should go to the movie page", () => { });
})