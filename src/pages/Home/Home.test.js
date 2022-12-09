import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../../routes';

jest.mock('react-router-dom', () => {
  const nav = jest.fn();
  return {
    ...jest.requireActual('react-router-dom'),
    mockedNavigation: nav,
    useLocation: jest.fn(() => ({ pathname: '/' })),
    useNavigate: jest.fn(() => nav),
  };
});

const Router = require('react-router-dom');

describe("Home", () => {
  test("Home should display top movies and shows", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("heading", { name: /the movie database/i }));

    expect(screen.getByRole("heading", { name: /top movies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /top TV/i })).toBeInTheDocument();

    const lists = screen.getAllByRole("list");
    expect(lists.length).toBe(2);

    expect(within(lists[0]).getAllByRole("listitem").length).toBe(5);
    expect(within(lists[1]).getAllByRole("listitem").length).toBe(5);
  });

  test("Click on movie should go to the movie page", async () => {
    
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("heading", { name: /the movie database/i }));

    const lists = screen.getAllByRole("list");
    const movie = within(lists[0]).getAllByRole("listitem")[0];

    userEvent.click(within(movie).getByRole("link"));

    await waitFor(() => screen.getByRole("heading", { name: /black/i }));

    expect(router.state.location.pathname).toBe("/movie/436270");
  });
});

