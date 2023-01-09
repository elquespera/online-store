import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import userEvent from '@testing-library/user-event';

describe('Test routing', () => {
  test('Cart page test', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  });

  test('Details page test', () => {
    render(
      <MemoryRouter initialEntries={['/product-details/1']}>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByTestId('details-page')).toBeInTheDocument();
  });

  test('Store front page test', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByTestId('store-front-page')).toBeInTheDocument();
  });

  test('Error page test', () => {
    render(
      <MemoryRouter initialEntries={['/qweqwe']}>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  test('Click link cart', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Main />
      </MemoryRouter>
    );
    const cartLink = screen.getByTestId('cart-link');
    userEvent.click(cartLink);
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  });

  test('Click link store front', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Header />
        <Main />
      </MemoryRouter>
    );
    const storeFrontLink = screen.getByTestId('store-front-link');
    userEvent.click(storeFrontLink);
    expect(screen.getByTestId('store-front-page')).toBeInTheDocument();
  });
});
