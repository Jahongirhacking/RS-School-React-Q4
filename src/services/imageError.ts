import { SyntheticEvent } from 'react';

export const handleImageError = (
  event: SyntheticEvent<HTMLImageElement, Event>,
  image: string
) => {
  event.currentTarget.src = image;
};
