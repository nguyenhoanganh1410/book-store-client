import React, { FC } from 'react';
import Image from 'next/image';
import { Chapter } from '@/queries/type';
import { useBirdEyeItemHooks } from './hooks';
import { PlayIcon } from '@/icons';

interface IProps {
  index: number;
  item: Chapter;
}

const BirdEyeItem: FC<IProps> = ({ index, item }) => {
  const { isMarkedChapter, onSelectItem } = useBirdEyeItemHooks({
    chapter: item,
  });

  return (
    <div
      onClick={onSelectItem}
      className='flex-1 flex flex-col bg-black rounded-lg cursor-pointer w-full transition ease-in-out delay-75 hover:-translate-y-2 hover:shadow-3xl duration-300'
    >
      <div className='relative w-full h-72'>
        <Image
          alt={`Overview Image ${index}`}
          src={'/images/banner_1.png'}
          className='object-cover'
          fill
          priority
        />
        <div className='bg-[#6b6b6b] opacity-10 w-full h-full'></div>
        <span className='absolute top-[50%] w-12 ring-offset-2 ring-lightWhite ring-4 h-12 bg-white rounded-full flex justify-center items-center left-[50%] -translate-x-2/4 -translate-y-2/4'>
          <PlayIcon />
        </span>
        {isMarkedChapter && (
          <div className='absolute top-6 right-0 bg-primary font-Poppins font-semibold text-white text-sm pl-4 pr-2 py-1 rounded-l-3xl'>
            Completed
          </div>
        )}
      </div>
      <div className='flex-1 flex flex-col rounded-b-lg p-4 bg-gradient-to-b from-white to-white shadow'>
        <p className='font-Inter font-semibold text-primaryText text-xs '>
          VIDEO {item.indexChapter}
        </p>
        <p className='font-Poppins font-semibold text-primary text-lg xl:text-[32px] xl:py-2 leading-snug'>
          {item.title}
        </p>
        <p className='h-fit text-sky-950 text-sm xl:text-[22px] font-DMSans font-normal line-clamp-3 leading-snug'>
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default BirdEyeItem;
