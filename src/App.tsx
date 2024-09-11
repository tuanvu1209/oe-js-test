import { useEffect, useState } from 'react';
import Products from '../src/data/products.json';
import StoreProducts from '../src/data/storeProducts.json';
import Stores from '../src/data/stores.json';
import './App.css';
import Card from './component/Card';
import Filter from './component/Filter';
import Menu from './component/Menu';
import { ProductProps } from './types';
import { Button, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [storeSelected, setStoreSelected] = useState(Stores.stores[0]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filterToppings, setFilterToppings] = useState<string[]>([]);
  const [filterToppingSelected, setFilterToppingSelected] = useState<string[]>(
    []
  );
  const [filterType, setFilterType] = useState('name-asc');
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const getProductsByStore = (storeId: number) => {
    return StoreProducts.shopProducts
      .filter((storeProduct) => storeProduct.shop === storeId)
      .map((storeProduct) => {
        return Products.products.find(
          (product) => product.id === storeProduct.product
        ) as ProductProps;
      });
  };

  const sortProducts = (products: ProductProps[], type: string) => {
    const sortedProducts = [...products]; // Create a copy of the array for immutability
    switch (type) {
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-dsc':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-dsc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filterProductsByToppings = (
    products: ProductProps[],
    selectedToppings: string[]
  ) => {
    if (selectedToppings.length === 0) return products;

    return products.filter((product) => {
      const toppings = product.toppings
        .split(',')
        .map((topping) => topping.trim());
      return selectedToppings.every((filter) => toppings.includes(filter));
    });
  };

  const updateProductList = () => {
    const productsForStore = getProductsByStore(storeSelected.id);
    const sortedProducts = sortProducts(productsForStore, filterType);
    const filteredProducts = filterProductsByToppings(
      sortedProducts,
      filterToppingSelected
    );
    setProducts(filteredProducts);
  };

  const getUniqueToppings = (products: ProductProps[]) => {
    const toppings = products
      .map((product) =>
        product.toppings.split(',').map((topping) => topping.trim())
      )
      .flat();
    return Array.from(new Set(toppings));
  };

  useEffect(() => {
    const productsForStore = getProductsByStore(storeSelected.id);
    setProducts(sortProducts(productsForStore, filterType));
    setFilterToppings(getUniqueToppings(productsForStore));
    setFilterToppingSelected([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeSelected]);

  useEffect(() => {
    updateProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterToppingSelected, filterType]);

  return (
    <main className='flex bg-slate-100'>
      <div className='hidden md:block'>
        <Menu
          stores={Stores.stores}
          storeSelected={storeSelected}
          onSetStoreSelected={setStoreSelected}
        />
      </div>
      <div className='md:hidden absolute top-[30px] md:top-10 left-4 md:left-10'>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon sx={{color: '#1e3a8a', fontSize: '30px'}} />
        </Button>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
        >
          <Menu
            stores={Stores.stores}
            storeSelected={storeSelected}
            onSetStoreSelected={setStoreSelected}
          />
        </Drawer>
      </div>
      <div className='flex-1 p-4 lg:px-10 mb-10'>
        <h1 className='text-3xl md:text-5xl text-center text-blue-900 font-semibold mb-4 md:mb-10 mt-4 md:mt-10'>
          {storeSelected.name}
        </h1>
        <Filter
          filterToppings={filterToppings}
          filterToppingSelected={filterToppingSelected}
          onSetFilterToppingSelected={setFilterToppingSelected}
          filterType={filterType}
          onSetFilterType={setFilterType}
        />
        <div className='mt-10 sm:grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-4 md:gap-4'>
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
