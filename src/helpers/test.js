import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import routes from "../routes";

export async function setupRouting() {
    const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("heading", { name: /the movie database/i }));

    return router;
}

export async function setupTestingEnvironment() {
    const router = await setupRouting();

    return router;
}