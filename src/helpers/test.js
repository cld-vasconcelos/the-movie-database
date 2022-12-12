import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import routes from "../routes";

import { mockMoviesHelper } from "../__mocks__/helpers/movies";
import { mockShowsHelper } from "../__mocks__/helpers/shows";

function setupMocks() {
    mockMoviesHelper();
    mockShowsHelper();
}

async function setupRouter() {
    setupMocks();

    const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("heading", { name: /the movie database/i }));

    return router;
}

export async function setupTestingEnvironment() {
    setupMocks();
    const router = await setupRouter();

    return router;
}