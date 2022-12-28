import { API_URL_PRODUCTS } from '../constants/ApiUrl';
import { InfoFetchProducts } from './interface';

export async function getAllProducts() {
  try {
    const response = await fetch(API_URL_PRODUCTS);

    const json: InfoFetchProducts = await response.json();
    return json.products;
  } catch (e) {
    console.log(e);
  }
}
