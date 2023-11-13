import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { IPokemonLocal } from '../@types/card';
import { fetchProperties } from '../services/api';
// Components
import { Cards } from '../pages/Main';
import Card from '../components/Card';
import Aside from '../pages/Aside';
import '@testing-library/jest-dom';
import NotFound from '../pages/NotFound';

const mockPokemon = {
  pokemonName: 'pikachu',
  imgUrl: 'pikachu.jpg',
  abilities: ['strong', 'believe'],
  height: 9,
  id: 3,
};

const mockData = [
  mockPokemon,
  {
    pokemonName: 'Bulbasaur',
    imgUrl: 'bulba.jpg',
    abilities: ['strong', 'hard'],
    height: 7,
    id: 4,
  },
];

const mockDetails = {
  name: 'Pikachu',
  sprite: 'pikachu.png',
  height: 40,
  abilities: ['Static', 'Lightning Rod'],
  types: ['Electric'],
  id: 3,
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
afterEach(cleanup);

describe('Pokemono App Testing:', () => {
  describe('Tests for the Card List component:', () => {
    test('should verify that the component renders the specified number of cards;', async () => {
      render(<RenderCards data={mockData} />);
      const cards = screen.getAllByTitle(/pokemon-card/i);
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
      const defaultFunc = () => {};

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
      const routes = [
        {
          path: '/details/:id',
          element: <Aside />,
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(mockDetails), 500);
            });
          },
        },
      ];

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/details/3'],
        initialIndex: 1,
      });

      render(<RouterProvider router={router} />);
      // Check if the detailed card data is displayed

      const loadingIndicator = await screen.findByRole('img');
      expect(loadingIndicator).toBeDefined();
    });

    test('Make sure the detailed card component correctly displays the detailed card data;', async () => {
      const routes = [
        {
          path: '/details/:id',
          element: <Aside />,
          loader: () => mockDetails,
        },
      ];

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/details/3'],
        initialIndex: 1,
      });

      render(<RouterProvider router={router} />);
      // Check if the detailed card data is displayed
      const nameElement = await screen.findByText(/pikachu/i);
      const idElement = await screen.findByText(/3/i);
      const heightElement = await screen.findByText(/40/i);
      const abilitiesElement = await screen.findByText(
        /Static, Lightning Rod/i
      );
      const typesElement = await screen.findByText(/Electric/i);

      expect(nameElement).toBeTruthy();
      expect(idElement).toBeTruthy();
      expect(heightElement).toBeTruthy();
      expect(abilitiesElement).toBeTruthy();
      expect(typesElement).toBeTruthy();
    });

    test('Ensure that clicking the close button hides the component.', async () => {
      const routes = [
        {
          path: '/details/:id',
          element: <Aside />,
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(mockDetails), 500);
            });
          },
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ];

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/details/3'],
        initialIndex: 1,
      });

      render(<RouterProvider router={router} />);
      // Check if the detailed card data is displayed
      const closeButton = await screen.findByText(/close/i);
      await fireEvent.click(closeButton);
      const aside = screen.queryByText('banner');
      expect(aside).toBeNull();
    });
  });

  describe('Tests for the 404 Page component:', () => {
    test('Tests for the 404 Page component:', async () => {
      const routes = [
        {
          path: '/details/:id',
          element: <Aside />,
          loader: () => mockDetails,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ];

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/badRoute'],
        initialIndex: 1,
      });

      render(<RouterProvider router={router} />);

      expect(screen.getByText(/page not found/i)).toBeDefined();
    });
  });
});
