import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupTestingEnvironment } from '../../helpers/test';

describe("Home", () => {
  test("Home should display top movies and shows", async () => {
    await setupTestingEnvironment();

    expect(screen.getByRole("heading", { name: /top movies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /top TV/i })).toBeInTheDocument();

    const lists = screen.getAllByRole("list");
    expect(lists.length).toBe(2);

    expect(within(lists[0]).getAllByRole("listitem").length).toBe(5);
    expect(within(lists[1]).getAllByRole("listitem").length).toBe(5);
  });

  test("Clicking on a movie should go to the movie page", async () => {
    const router = await setupTestingEnvironment();

    const lists = screen.getAllByRole("list");
    const movie = within(lists[0]).getAllByRole("listitem")[0];

    userEvent.click(within(movie).getByRole("link"));

    await waitFor(() => screen.getByRole("heading", { name: /black/i }));

    expect(router.state.location.pathname).toBe("/movie/436270");
  });

  test("Clicking on a show should go to the show page", async () => {
    const router = await setupTestingEnvironment();

    const lists = screen.getAllByRole("list");
    const show = within(lists[1]).getAllByRole("listitem")[0];

    userEvent.click(within(show).getByRole("link"));

    await waitFor(() => screen.getByRole("heading", { name: /wednesday/i }));

    expect(router.state.location.pathname).toBe("/tv/119051");
  });
});