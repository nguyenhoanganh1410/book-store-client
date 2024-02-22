import Image from 'next/image';
import React, { FC } from 'react';

interface IProps {}

const BANNER_01 = '/images/logo_01.png';
const BANNER_02 = '/images/logo_02.png';
const BANNER_03 = '/images/logo_03.png';
const BANNER_04 = '/images/logo_04.png';

const Logos: FC<IProps> = () => {
  return (
    <div className='flex flex-col gap-4 my-8'>
      <div className='bg-white p-8 flex flex-col rounded-lg'>
        <div className='flex gap-8 flex-wrap'>
        <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_01}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>

          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_02}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>

          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_03}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>

          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_04}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>
          
          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_01}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>

          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_02}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>

          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_03}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>

          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_04}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>

          <div className='flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-2 duration-300 flex-col w-[100px]'>
            <div className='w-full h-[100px] relative'>
              <Image
                alt='Logo'
                src={BANNER_03}
                fill
                priority
                className='object-cover rounded-lg cursor-pointer'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
