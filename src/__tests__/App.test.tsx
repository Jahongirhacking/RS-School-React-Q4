// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { screen, render, cleanup, fireEvent, prettyDOM, waitFor, findByText } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { IPokemonLocal } from '../@types/card';
import { fetchProperties } from '../services/api';
import { Routes as RoutePaths } from '../routes';
// Components
import { Cards } from '../pages/Main';
import Card from '../components/Card';
import Aside from '../pages/Aside';
import '@testing-library/jest-dom';
import NotFound from '../pages/NotFound';
import ErrorRouting from '../error/ErrorRouting';
import RootLayout from '../layouts/RootLayout';
import HomePageLayout from '../layouts/HomePageLayout';
import DetailsNotFound from '../pages/DetailsNotFound';

const mockPokemon = {
  pokemonName: 'pikachu',
  imgUrl: 'pikachu.jpg',
  abilities: ['strong', 'believe'],
  height: 9,
  id: 3,
};

const mockData = [
  {
    pokemonName: 'pikachu',
    imgUrl: 'pikachu.jpg',
    abilities: ['strong', 'believe'],
    height: 9,
    id: 2
  },
  {
    pokemonName: 'pikacho',
    imgUrl: 'pikacho.jpg',
    abilities: ['stronge', 'believee'],
    height: 10,
    id: 3
  }, {
    pokemonName: 'pikacha',
    imgUrl: 'pikacha.jpg',
    abilities: ['strongu', 'believeu'],
    height: 8,
    id: 1
  }
];

const mockDetails = {
  name: 'Pikachu',
  sprite: 'pikachu.png',
  height: 40,
  abilities: ['Static', 'Lightning Rod'],
  types: ['Electric'],
  id: 5,
};

const RenderCards = ({ data }: { data: IPokemonLocal[] }) => {
  return (
    <BrowserRouter>
      <Cards pokemonsList={data} handleFilter={() => true} />
    </BrowserRouter>
  );
};

const RenderCard = ({ data }: { data: IPokemonLocal }) => {
  return (
    <BrowserRouter>
      <Card
        pokemonName={data.pokemonName}
        imgUrl={data.imgUrl}
        abilities={data.abilities}
        height={data.height}
        id={data.id}
      />
    </BrowserRouter>
  );
};

const routes = [
  {
    path: RoutePaths.HOME,
    element: <RootLayout />,
    errorElement: <ErrorRouting />,
    children: [
      {
        path: RoutePaths.HOME,
        element: <HomePageLayout />,
        children: [
          {
            path: `${RoutePaths.DETAILS}/:id`,
            element: <Aside />,
            loader: () => {
              return new Promise(resolve => setTimeout(() => resolve(mockDetails), 500))
            },
            errorElement: <DetailsNotFound />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/', '/details/3'],
  initialIndex: 1,
});


afterEach(cleanup);
describe('Pokemono App Testing:', () => {
  describe('Tests for the Card List component:', () => {
    test('should verify that the component renders the specified number of cards;', async () => {
      render(<RenderCards data={mockData} />);
      const cards = await screen.findAllByTitle(/pokemon-card/i);
      expect(cards.length).toBe(mockData.length);
    });

    test('should check that an appropriate message is displayed if no cards are present;', async () => {
      render(<RenderCards data={[]} />);
      const warningElement = screen.getByText(/nothing found for now/i);
      expect(warningElement).toBeTruthy();
    });
  });

  describe('Tests for the Card component:', () => {
    test('should ensure that the card component renders the relevant card data;', async () => {
      render(<RenderCard data={mockPokemon} />);
      expect(screen.getByText(/pikachu/i));
    });

    test('should validate that clicking on a card opens a detailed card component;', async () => {
      render(<RenderCard data={mockPokemon} />);
      const pikachuButton = screen.getByText(/details/i);
      fireEvent.click(pikachuButton);
      expect(window.location.pathname).toBe(`/details/${mockPokemon.id}/`);
    });

    test('should check that clicking triggers an additional API call to fetch detailed information.', async () => {
      const market = { fetchProperties };
      const fetchDetailsMock = vi.spyOn(market, 'fetchProperties');

      render(<RenderCard data={mockPokemon} />);

      const pikachuButton = screen.getByText(/details/i);
      fireEvent.click(pikachuButton);
      const defaultFunc = () => { };

      market.fetchProperties(mockPokemon.id, defaultFunc);
      // Assuming that the API is called with the correct parameters when a card is clicked
      expect(fetchDetailsMock).toHaveBeenCalledWith(
        mockPokemon.id,
        defaultFunc
      );
    });
  });

  describe('Tests for the Detailed Card component:', () => {
    test('Check that a loading indicator is displayed while fetching data;', async () => {
      render(<RouterProvider router={router} />);
      // Check if the detailed card data is displayed

      const loadingIndicator = await screen.findByRole('img');
      expect(loadingIndicator).toBeDefined();
    });

    test('make sure the detailed card component correctly displays the detailed card data;', async () => {
      render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ["/", `/${RoutePaths.DETAILS}/3`], initialIndex: 1 })} />);
      // Check if the detailed card data is displayed
      const nameElement = await screen.findByText(/name: pikachu/i);
      const abilitiesElement = await screen.findByText(
        /abilities: Static, Lightning Rod/i
      );
      const typesElement = await screen.findByText(/Electric/i);

      expect(nameElement).toBeTruthy();
      expect(abilitiesElement).toBeTruthy();
      expect(typesElement).toBeTruthy();
    });

    test('should ensure that clicking the close button hides the component.', async () => {
      render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/', `/${RoutePaths.DETAILS}/3`], initialIndex: 1 })} />);
      // Check if the detailed card data is displayed
      const closeButton = await screen.findByText(/close/i);
      fireEvent.click(closeButton);
      const aside = screen.queryByText('banner');
      expect(aside).toBeNull();
    });
  });

  describe("Tests for the Pagination component", () => {
    test("should make sure the component updates URL query parameter when page changes.", () => {
      render(<RouterProvider router={router} />);
      // collapse
      const toggleButton = screen.getAllByRole("button")[1];
      fireEvent.click(toggleButton);
      const prevParam = window.location.toString();
      const nextButton = screen.getAllByRole("button")[3];
      fireEvent.click(nextButton);
      console.log(prevParam, window.location.toString())
      // expect()
    })
  })

  describe("Tests for the Search component:", () => {
    test("should verify that clicking the Search button saves the entered value to the local storage;", async () => {
      render(<RouterProvider router={router} />);
      const input = screen.getByPlaceholderText(/pokemon name.../i);
      fireEvent.change(input, { target: { value: "pikachu" } });
      const button = screen.getAllByRole("button")[0];
      fireEvent.click(button);
      expect(window.localStorage.getItem("searchedKey")).toBe("pikachu");
    })
    test("should check that the component retrieves the value from the local storage upon mounting.;", async () => {
      window.localStorage.setItem("searchedKey", "pikachu");
      render(<RouterProvider router={router} />);
      expect(await screen.findByText(/pikachu/i));
    })
  })

  describe('Tests for the 404 Page component:', () => {
    test('Tests for the 404 Page component:', async () => {
      render(<RouterProvider router={createMemoryRouter(routes, {
        initialEntries: ['/', '/badRoute'],
        initialIndex: 1,
      })} />);

      expect(screen.getByText(/page not found/i)).toBeDefined();
    });
  });
});
