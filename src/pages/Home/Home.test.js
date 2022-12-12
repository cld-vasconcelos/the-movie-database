import { render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routes from '../../routes';

import mockPopularMoviesResponse from "../../__mocks__/popular-movies.json";
import mockPopularShowsResponse from "../../__mocks__/popular-shows.json";
import mockMovieCreditsResponse from "../../__mocks__/movie-credits.json";
import mockShowCreditsResponse from "../../__mocks__/show-credits.json";
import mockShowResponse from "../../__mocks__/show.json";

jest.mock("../../helpers/movies", () => ({
  getPopularMovies: () => {
    return mockPopularMoviesResponse;
  },
  getMovie: (movieId) => {
    return mockPopularMoviesResponse.results.find(movie => movie.id == movieId);
  },
  getMovieCredits: (_) => {
    return mockMovieCreditsResponse;
  }
}));

jest.mock("../../helpers/shows", () => ({
  getPopularShows: () => {
    return mockPopularShowsResponse;
  },
  getShow: (_) => {
    return mockShowResponse;
  },
  getShowCredits: (_) => {
    return mockShowCreditsResponse;
  }
}));

async function setup() {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => screen.getByRole("heading", { name: /the movie database/i }));

  return router;
}

describe("Home", () => {
  test("Home should display top movies and shows", async () => {
    await setup();

    expect(screen.getByRole("heading", { name: /top movies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /top TV/i })).toBeInTheDocument();

    const lists = screen.getAllByRole("list");
    expect(lists.length).toBe(2);

    expect(within(lists[0]).getAllByRole("listitem").length).toBe(5);
    expect(within(lists[1]).getAllByRole("listitem").length).toBe(5);
  });

  test("Clicking on movie should go to the movie page", async () => {
    const router = await setup();

    const lists = screen.getAllByRole("list");
    const movie = within(lists[0]).getAllByRole("listitem")[0];

    userEvent.click(within(movie).getByRole("link"));

    await waitFor(() => screen.getByRole("heading", { name: /black/i }));

    expect(router.state.location.pathname).toBe("/movie/436270");
  });

  test("Clicking on show should go to the show page", async () => {
    const router = await setup();

    const lists = screen.getAllByRole("list");
    const show = within(lists[1]).getAllByRole("listitem")[0];

    userEvent.click(within(show).getByRole("link"));

    await waitFor(() => screen.getByRole("heading", { name: /wednesday/i }));

    expect(router.state.location.pathname).toBe("/tv/119051");
  });
});