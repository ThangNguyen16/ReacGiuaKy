import React from 'react';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

import MovieCard, {
  Movie,
} from '../components/MovieCard';


const movie: Movie = {

  id: '1',

  title: 'Avengers: Endgame',

  genre: 'Action',

  year: 2019,

  rating: 8,

  poster: 'https://example.com/poster.jpg',

  isShowing: true,

};


describe('MovieCard', () => {


  test('hiển thị title và rating', () => {

    const { getByText } =
      render(
        <MovieCard
          movie={movie}
          onSelect={jest.fn()}
        />
      );


    expect(
      getByText('Avengers: Endgame')
    ).toBeTruthy();


    expect(
      getByText('⭐ 8.0')
    ).toBeTruthy();

  });


  test('row hiển thị genre', () => {

    const { getByText } =
      render(
        <MovieCard
          movie={movie}
          layout="row"
          onSelect={jest.fn()}
        />
      );


    expect(
      getByText('Thể loại: Action')
    ).toBeTruthy();

  });


  test('tile không hiển thị genre', () => {

    const { queryByText } =
      render(
        <MovieCard
          movie={movie}
          layout="tile"
          onSelect={jest.fn()}
        />
      );


    expect(
      queryByText('Thể loại: Action')
    ).toBeNull();

  });


  test('isShowing true hiển thị đang chiếu', () => {

    const { getByText } =
      render(
        <MovieCard
          movie={movie}
          onSelect={jest.fn()}
        />
      );


    expect(
      getByText('Đang chiếu ✅')
    ).toBeTruthy();

  });


  test('isShowing false hiển thị ngừng chiếu', () => {

    const stoppedMovie = {
      ...movie,
      isShowing: false,
    };


    const { getByText } =
      render(
        <MovieCard
          movie={stoppedMovie}
          onSelect={jest.fn()}
        />
      );


    expect(
      getByText('Ngừng chiếu ❌')
    ).toBeTruthy();

  });


  test('press gọi onSelect đúng 1 lần', () => {

    const onSelect = jest.fn();


    const { getByText } =
      render(
        <MovieCard
          movie={movie}
          onSelect={onSelect}
        />
      );


    fireEvent.press(
      getByText('Avengers: Endgame')
    );


    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(onSelect).toHaveBeenCalledWith(
      '1'
    );

  });

});