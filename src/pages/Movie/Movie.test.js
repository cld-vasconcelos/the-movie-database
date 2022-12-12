import { screen, waitFor, within } from "@testing-library/react";
import { setupTestingEnvironment } from "../../helpers/test";

jest.mock("../../helpers/movies.js");

describe("Movie", () => {
    test("Page layout", async () => {
        const router = await setupTestingEnvironment(["/", "/movie/436270"]);

        await waitFor(() => screen.getByRole("heading", { name: /black adam/i }));

        const lists = screen.getAllByRole("list");
        expect(lists.length).toBe(4);

        const detailsListItems = within(lists[0]).getAllByRole("listitem");
        expect(detailsListItems.length).toBe(3);
        within(detailsListItems[0]).findByRole("heading", { name: /sypnosys/i });
        within(detailsListItems[1]).findByRole("heading", { name: /release date/i });
        within(detailsListItems[2]).findByRole("heading", { name: /runtime/i });

        const crewListItems = within(lists[1]).getAllByRole("listitem");
        expect(crewListItems.length).toBe(1);
        expect(within(crewListItems[0]).getByRole("heading", { name: /director/i })).toBeInTheDocument();

        const castList = lists[2];
        expect(within(castList).getAllByRole("listitem").length).toBe(10);
        expect(screen.getByRole("heading", { name: /cast/i })).toBeInTheDocument();
    })
});