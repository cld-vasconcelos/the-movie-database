import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import routes from "../routes";

export async function setupRouting(initialEntries) {
    const router = createMemoryRouter(routes, {
        initialEntries,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("heading", { name: /the movie database/i }));

    return router;
}

export async function setupTestingEnvironment(initialEntries = ["/"]) {
    const router = await setupRouting(initialEntries);

    return router;
}