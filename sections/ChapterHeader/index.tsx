import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useChapterHeaderHooks } from './hooks';
import { Chapter } from '@/queries/type';

const ChapterHeader = ({ chapter }: { chapter?: Chapter }) => {
  const {
    isFirstChapter,
    isLastChapter,
    onBack,
    onNextChapter,
    onPreviousChapter,
  } = useChapterHeaderHooks();

  return (
    <div className='flex flex-col font-Inter'>
      <div className='flex flex-row items-center'>
        <button
          onClick={onBack}
          className='flex flex-row items-center space-x-1'
        >
          <FontAwesomeIcon
            icon={['fas', 'chevron-left']}
            className={`text-primary  cursor-pointer`}
          />
          <p className='text-primary font-bold text-base sm:text-lg 2xl:text-xl'>
            Back
          </p>
        </button>
        <div className='ml-6 sm:ml-12 text-primaryText font-semibold text-lg sm:text-xl 2xl:text-2xl'>
          Chapter {chapter?.indexChapter}
          <p className='inline font-normal'> | </p>
          {chapter?.title}
        </div>
      </div>
      <div className='rounded-lg mt-6'>
        {chapter?.video && (
          <div className='relative h-0 pb-[52.734375%] rounded-lg'>
            <iframe
              src={
                chapter?.video +
                '?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true'
              }
              className='absolute top-0 left-0 w-full h-full'
              title='Your Journey Animated Overview Video'
            ></iframe>
          </div>
        )}
        <div className='px-6 py-4 flex flex-row items-center justify-between rounded-b-lg bg-white drop-shadow-custom-4-4 w-full'>
          <button
            disabled={isFirstChapter}
            onClick={onPreviousChapter}
            className={`flex flex-row items-center space-x-1 ${
              isFirstChapter ? 'text-gray-200' : 'text-primary'
            }`}
          >
            <FontAwesomeIcon icon={['fas', 'chevron-left']} size='sm' />
            <p className='font-bold text-base sm:text-lg 2xl:text-xl'>
              Previous
            </p>
          </button>
          <button
            disabled={isLastChapter}
            onClick={onNextChapter}
            className={`flex flex-row items-center space-x-1 ${
              isLastChapter ? 'text-gray-200' : 'text-primary'
            }`}
          >
            <p className='font-bold text-base sm:text-lg 2xl:text-xl'>Next</p>
            <FontAwesomeIcon icon={['fas', 'chevron-right']} size='sm' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterHeader;
