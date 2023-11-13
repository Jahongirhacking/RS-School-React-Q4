import { screen, render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Card from '../components/Card';
import { BrowserRouter } from 'react-router-dom';

const mockData = [{
  pokemonName: "pikachu",
  imgUrl: "pikachu.jpg",
  abilities: ["strong", "believe"],
  height: 9,
  id: 3
}, {
  pokemonName: "Bulbasaur",
  imgUrl: "bulba.jpg",
  abilities: ["strong", "hard"],
  height: 7,
  id: 4
}]

const Cards = () => {
  return (
    <BrowserRouter>
      {mockData.map(data => <Card
        key={data.id}
        pokemonName={data.pokemonName}
        imgUrl={data.imgUrl}
        abilities={data.abilities}
        height={data.height}
        id={data.id} />
      )
      }
    </BrowserRouter>

  )
}

describe('Cards List', () => {
  test('should have exact number', async () => {
    render(<Cards />);
    const cards = screen.getAllByTitle(/pokemon-card/i)
    expect(cards.length).toBe(mockData.length);
  });
});
