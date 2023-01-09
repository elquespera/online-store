import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Main from '../components/Main/Main';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test details page', () => {
  test('Routing to cart page when click buy now', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/product-details/1']}>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByTestId('details-page')).toBeInTheDocument();
    expect(screen.queryByTestId('product not found')).toBeNull();
    userEvent.click(getByText(/buy now/i));
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  });

  test('Routing to store page when click STORE', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/product-details/1']}>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByTestId('details-page')).toBeInTheDocument();
    expect(screen.queryByTestId('product not found')).toBeNull();
    userEvent.click(getByText(/store/i));
    expect(screen.getByTestId('store-front-page')).toBeInTheDocument();
  });

  test('Click add to cart', () => {
    const { getByTestId, getAllByRole, getByText, queryByText } = render(
      <App />
    );
    userEvent.click(getAllByRole('img')[0]);
    const totalPrice = getByText(/total/i).textContent || '';
    expect(getByTestId('details-page')).toBeInTheDocument();
    expect(getByTestId('quantity products')).toHaveTextContent('0');
    expect(getByText(/total/i)).toHaveTextContent(totalPrice);
    userEvent.click(getByText(/add to cart/i));
    expect(getByTestId('quantity products')).toHaveTextContent('1');
    expect(queryByText(/total/i)).not.toHaveTextContent(totalPrice);
  });
});
