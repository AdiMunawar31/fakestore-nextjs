export const API_BASE_URL = 'https://fakestoreapi.com';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,
  CATEGORIES: '/categories',
  CART: '/cart',
  LOGIN: '/login',
  PROFILE: '/profile',
};

export const REVALIDATE_PRODUCTS = 60;
