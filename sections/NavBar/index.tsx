import React, { FC } from 'react';
import { useNavBarHooks } from './hooks';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useAuthState } from '@/contexts/auth';
import DropdownUser from '../DropdownUser';
import { ROUTERS } from '@/constants';

export const LOGO_URL = '/images/fahasa-logo.png';

interface IProps {}

const NavBar: FC<IProps> = () => {
  const { renderAvatarName, logout, onGoHome, isOpenMenu, toggleMenu } =
    useNavBarHooks();
  const {profile} = useAuthState();
  return (
    <div className=''>
      <div className='w-full h-20 flex flex-row justify-between items-center px-4 sm:px-9 md:px-10 bg-white border-b border-borderDarkGrey/20'>
        <div className='flex gap-8 justify-center items-center'>
        <Link href={ROUTERS.home} className='cursor-pointer flex flex-row items-center space-x-2'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 lg:h-20 lg:w-48 relative'>
            <Image alt='Logo' src={LOGO_URL} fill priority className='object-contain' />
          </div>
        </Link>
        <div className='flex gap-8'>
          <Link href='/home' className='font-semibold hover:text-red-400'>Trang chủ</Link>
          <Link href='#' className='font-normal  hover:text-red-400'>Sản phẩm</Link>
          <Link href='#' className='font-normal hover:text-red-400'>Cửa hàng</Link>
         
        </div>
        </div>
        <div className='flex md:hidden' onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={['fas', 'bars']}
            size='xl'
            className={`text-primary cursor-pointer`}
          />
        </div>
        
        { profile ?  <DropdownUser /> : <Link href={ROUTERS.login} className='text-sm text-gray-500 font-semibold cursor-pointer hover:text-red-300'>Đăng nhập</Link> }
       
      </div>
      {isOpenMenu && (
        <div className='px-6'>
          <div className='md:hidden flex flex-col gap-4 p-4 items-start text-primaryText font-semibold text-sm bg-white rounded-lg drop-shadow-custom-4-4 '>
            <div className='flex flex-row space-x-3'>
              <div className='w-10 h-10 rounded-full bg-primary flex justify-center items-center'>
                <p className='text-white font-bold capitalize'>{renderAvatarName}</p>
              </div>
              <button onClick={logout} className='text-orange font-medium '>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
