import Image from 'next/image';
import React, { FC } from 'react';
import { ICategory } from '@/utils/interfaces';

interface IProps {
  categories: ICategory[];
}

const BANNER_01 = '/images/banner_01.jpg';
const BANNER_02 = '/images/banner_02.jpg';
const BANNER_03 = '/images/banner_03.jpg';
const BANNER_04 = '/images/banner_04.jpg';
const BANNER_05 = '/images/banner_05.png';
const BANNER_06 = '/images/banner_05.jpg';
const BANNER_07 = '/images/banner_06.png';

const Banner: FC<IProps> = ({ categories }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div className='w-3/4 h-[312px] relative overflow-hidden '>
          <Image
            alt='Logo'
            src={BANNER_01}
            fill
            priority
            className='object-cover rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
          />
        </div>
        <div className='w-1/4 h-[312px] relative gap-4 flex flex-col'>
          <div className='w-full h-2/4 relative overflow-hidden'>
            <Image
              alt='Logo'
              src={BANNER_02}
              fill
              priority
              className='object-cover rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
            />
          </div>
          <div className='w-full h-2/4 relative overflow-hidden'>
            <Image
              alt='Logo'
              src={BANNER_03}
              fill
              priority
              className='object-cover rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
            />
          </div>
        </div>
      </div>
      <div className='flex gap-4 h-48'>
        <div className='w-1/4 h-full relative overflow-hidden'>
          <Image
            alt='Logo'
            src={BANNER_04}
            fill
            priority
            className='object-cover rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
          />
        </div>
        <div className='w-1/4 h-full relative overflow-hidden'>
          <Image
            alt='Logo'
            src={BANNER_05}
            fill
            priority
            className='object-cover rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
          />
        </div>
        <div className='w-1/4 h-full relative overflow-hidden'>
          <Image
            alt='Logo'
            src={BANNER_06}
            fill
            priority
            className='object-cover rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
          />
        </div>
        <div className='w-1/4 h-full relative overflow-hidden'>
          <Image
            alt='Logo'
            src={BANNER_07}
            fill
            priority
            className='object-cover rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
          />
        </div>
      </div>

      <div className='bg-white p-8 flex flex-col rounded-lg'>
        <p className='font-semibold text-xl'>Danh mục sản phẩm</p>
        <div className='h-[1px] my-4 w-full bg-gray-200'></div>
        <div className='flex gap-8 flex-wrap'>
          {categories.map((value) => {
            return (
              <div
                className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'
                key={value.id}
              >
                <div className='w-full h-[100px] relative'>
                  <Image
                    alt='Logo'
                    src={value.images[0]}
                    fill
                    priority
                    className='object-cover rounded-lg cursor-pointer'
                  />
                </div>
                <p className='text-center text-sm capitalize hover:text-red-400 mt-2 truncate'>
                  {value.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
