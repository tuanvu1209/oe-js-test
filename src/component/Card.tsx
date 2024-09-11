import { ProductProps } from '../types';

function Card({ product }: { product: ProductProps }) {
  return (
    <div className='flex col-span-1 flex-col shadow-xl rounded-md bg-white min-h-[250px] justify-between h-full'>
      <div className='p-4 flex flex-col'>
        <span className='text-blue-800 text-[18px]'>{`MT-${product.id}`}</span>
        <span className='text-blue-900 font-semibold text-[20px] pb-2 mb-4 border-b-[3px] border-blue-900  '>
          {product.name}
        </span>
        <span className='text-blue-900 font-semibold text-[20px]'>
          Toppings:
        </span>
        <span className='text-blue-800 text-[18px]'>{product.toppings}</span>
      </div>
      <div className='flex justify-between mb-4 mr-4'>
        {product.trending && (
          <span className='bg-blue-950 text-white px-2'>Trending</span>
        )}
        <span className='text-blue-900 text-[20px] font-semibold text-right flex-1'>
          {product.price}
        </span>
      </div>
    </div>
  );
}

export default Card;
