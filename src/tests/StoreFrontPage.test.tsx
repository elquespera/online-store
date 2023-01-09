import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test store front page', () => {
  test('Click add to cart and change quantity in header', () => {
    const { getAllByText, getByText, getByTestId } = render(<App />);

    expect(getByTestId('quantity products')).toHaveTextContent('0');
    fireEvent.click(getAllByText(/add to cart/i)[0]);
    expect(getByTestId('quantity products')).toHaveTextContent('1');
    fireEvent.click(getByText(/remove from cart/i));
    expect(getByTestId('quantity products')).toHaveTextContent('0');
  });

  test('Click add to cart and change total price in header', () => {
    const { getAllByText, getByText, queryByText } = render(<App />);
    const totalPrice = getByText(/total/i).textContent || '';

    expect(getByText(/total/i)).toHaveTextContent(totalPrice);
    fireEvent.click(getAllByText(/add to cart/i)[0]);
    expect(queryByText(/total/i)).not.toHaveTextContent(totalPrice);
    fireEvent.click(getByText(/remove from cart/i));
    expect(getByText(/total/i)).toHaveTextContent(totalPrice);
  });

  test('Change quantity products when input search', () => {
    const { getByPlaceholderText, queryByText, getByText, getAllByRole } =
      render(<App />);
    const inputSearch = getByPlaceholderText(/search product/i);
    const quantityAllProducts = getByText(/products (.*)/i).textContent || '';
    const allImageProductsLength = getAllByRole('img').length;

    fireEvent.input(inputSearch, {
      target: { value: '123' },
    });
    expect(queryByText(/products (.*)/i)).not.toHaveTextContent(
      quantityAllProducts
    );
    expect(getAllByRole('img').length).not.toBe(allImageProductsLength);

    fireEvent.input(inputSearch, {
      target: { value: '' },
    });
    expect(queryByText(/products (.*)/i)).toHaveTextContent(
      quantityAllProducts
    );
    expect(getAllByRole('img').length).toBe(allImageProductsLength);
  });

  test('Click first products and routind to details page', () => {
    const { getByTestId, getAllByRole } = render(<App />);

    userEvent.click(getAllByRole('img')[0]);
    expect(getByTestId('details-page')).toBeInTheDocument();
  });
});
