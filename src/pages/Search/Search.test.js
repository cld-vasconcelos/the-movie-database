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
    test("Submitting an empty search term should not change the page", () => { });

    test("Submitting a search term should redirect to the search page", () => { });

    test("Clicking on a movie should go to the movie page", () => { });

    test("Clicking on a show should go to the movie page", () => { });

    test("Clicking on a person should go to the movie page", () => { });
})