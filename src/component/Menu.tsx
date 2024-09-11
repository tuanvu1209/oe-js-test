import { Button } from '@mui/material';
import { StoreProps } from '../types';

function Menu({
  stores,
  storeSelected,
  onSetStoreSelected,
}: {
  stores: StoreProps[];
  storeSelected: StoreProps;
  onSetStoreSelected: (store: StoreProps) => void;
}) {
  return (
    <menu className='bg-blue-950 w-[250px] flex flex-col items-center min-h-[100vh] '>
      <h2 className='text-2xl p-4 mb-2 text-white'>Milk Tea Store</h2>
      <ul className='w-full'>
        {stores &&
          stores.map((store: StoreProps) => (
            <li
              key={store.id}
              className={storeSelected.id === store.id ? 'bg-blue-900' : ''}
            >
              <Button
                sx={{
                  width: '100%',
                  color: storeSelected.id === store.id ? 'white' : '#64748b',
                  fontSize: '22px',
                  textTransform: 'capitalize',
                }}
                onClick={() => onSetStoreSelected(store)}
              >
                {store.name}
              </Button>
            </li>
          ))}
      </ul>
    </menu>
  );
}

export default Menu;
