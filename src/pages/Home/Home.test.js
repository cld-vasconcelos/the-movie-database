import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupTestingEnvironment } from '../../helpers/test';

jest.mock("../../helpers/movies.js");
jest.mock("../../helpers/shows.js");

describe("Home", () => {
  test("Home should display top movies and shows", async () => {
    await setupTestingEnvironment();

    expect(screen.getByRole("heading", { name: /top movies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /top tv/i })).toBeInTheDocument();

    const lists = screen.getAllByRole("list");
    expect(lists.length).toBe(2);

    expect(within(lists[0]).getAllByRole("listitem").length).toBe(5);
    expect(within(lists[1]).getAllByRole("listitem").length).toBe(5);
  });

  test.each([
    { listIndex: 0, media: { id: 436270, name: /black adam/i, type: "movie" } },
    { listIndex: 1, media: { id: 119051, name: /wednesday/i, type: "tv" } }
  ])("Clicking on a popular $media.type result should go to its page", async ({ listIndex, media }) => {
    const router = await setupTestingEnvironment();

    const lists = screen.getAllByRole("list");
    const mediaItem = within(lists[listIndex]).getAllByRole("listitem")[0];

    userEvent.click(within(mediaItem).getByRole("link"));

    await waitFor(() => screen.getByRole("heading", { name: media.name }));

    expect(router.state.location.pathname).toBe(`/${media.type}/${media.id}`);
  });
});