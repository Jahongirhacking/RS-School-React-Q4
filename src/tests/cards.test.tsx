import { screen, render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Cards } from '../pages/Main';
import { BrowserRouter } from 'react-router-dom';
import { IPokemonLocal } from '../@types/card';

const mockData = [
  {
    pokemonName: 'pikachu',
    imgUrl: 'pikachu.jpg',
    abilities: ['strong', 'believe'],
    height: 9,
    id: 3,
  },
  {
    pokemonName: 'Bulbasaur',
    imgUrl: 'bulba.jpg',
    abilities: ['strong', 'hard'],
    height: 7,
    id: 4,
  },
];

const PokemonCards = ({ data }: { data: IPokemonLocal[] }) => {
  return (
    <BrowserRouter>
      <Cards pokemonsList={data} handleFilter={() => true} />
    </BrowserRouter>
  );
};

describe('Cards List', () => {
  test('should have exact number of lists', async () => {
    render(<PokemonCards data={mockData} />);
    const cards = screen.getAllByTitle(/pokemon-card/i);
    expect(cards.length).toBe(mockData.length);
  });

  test('should warn about empty list', async () => {
    render(<PokemonCards data={[]} />);
    const warningElement = screen.getByText(/nothing found for now/i);
    expect(warningElement).toBeTruthy();
  });
});
