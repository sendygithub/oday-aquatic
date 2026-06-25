export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  strain: string;
};

export type Cart = CartItem[];
