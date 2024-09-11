export interface StoreProps {
  id: number;
  name: string;
}

export interface StoreProductProps {
  id: number;
  shop: number;
  product: number;
}

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  toppings: string;
  trending: boolean;
}
