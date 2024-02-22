import Image from 'next/image';
import React, { FC } from 'react';
import { IProduct } from '@/utils/interfaces';
import Link from 'next/link';

interface IProps {
  products: IProduct[];
  title: string;
}

const ProductBlock: FC<IProps> = ({ products, title }) => {
  return (
    <div className='bg-white p-8 flex flex-col rounded-lg'>
      <p className='font-semibold text-xl'>{title}</p>
      <div className='h-[1px] my-4 w-full bg-gray-200'></div>
      <div className='flex gap-10 flex-wrap'>
        {products.map((value) => {
          return (
            <Link
              href={`/product/${value.id}`}
              className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[180px]'
              key={value.id}
            >
              <div className='w-full h-[160px] relative'>
                <Image
                  alt='Logo'
                  src={value.images[0]}
                  fill
                  priority
                  className='object-cover rounded-lg cursor-pointer'
                />
              </div>
              <p className='text-center text-sm capitalize hover:text-red-400 mt-4 truncate'>
                {value.name}
              </p>
              <div className='flex gap-2 justify-start items-center'>
                {value.discount && (
                  <p className='text-[#C92127] font-bold text-base'>
                    {(
                      value.price -
                      (value.price * value.discount) / 100
                    ).toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                )}

                {value.discount && (
                  <div className='bg-[#C92127] rounded-md p-1 flex justify-center items-center'>
                    <span className='font-semibold text-white text-[10px]'>
                      -{value.discount}%
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className='text-[#C92127] font-bold text-sm mt-2'>
                  {value.price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <p className='text-start text-xs capitalize hover:text-red-400 mt-2 truncate'>
                Đã bán:{' '}
                <span className='font-semibold'> {value?.sold || 0}</span>
              </p>
            </Link>
          );
        })}
        {products.length === 0 && (
          <div className='w-full flex justify-center items-center'>
            <p className='text-center text-xs font-bold capitalize hover:text-red-400 mt-4 truncate'>
              Không có sản phẩm nào!
            </p>
          </div>
        )}
      </div>
      {products.length !== 0 && (
        <div className='flex justify-center w-full pt-4'>
          <div className='border-2 border-[#C92127] hover:bg-[#C92127] font-semibold text-sm max-w-[180px] hover:text-white cursor-pointer rounded-lg px-4 py-2 text-[#C92127]'>
            Xem thêm
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBlock;
