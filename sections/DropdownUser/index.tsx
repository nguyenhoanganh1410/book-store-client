import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAuthState } from '@/contexts/auth';
import Link from 'next/link';
import { ROUTERS } from '@/constants';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { ICart } from '@/utils/interfaces';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuthState();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const { user, profile } = useAuthState();
  const [cart, setCart] = useState<ICart[]>([]);

  const getCart = useCallback(() => {
    try {
      const q = query(
        collection(db, 'cart'),
        where('deleted', '==', false),
        where('userId', '==', profile?.uid),
        orderBy('createdAt', 'desc')
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ICart[];
        setCart(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    profile && getCart();
  }, [profile]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative flex justify-center'>
      {
        cart.length > 0 && 
        <Link href={ROUTERS.cart} className='w-6 h-6 relative mr-5 mt-2 cursor-pointer hover:opacity-80'>
          <div className='absolute z-10  right-[-6px] top-[-6px] w-4 h-4 bg-orange-400 rounded-full shadow-lg flex justify-center items-center'>
            <span className='text-white text-[11px] font-bold'>{cart.length}</span>
          </div>
          <Image alt='Logo' src='/images/cart_light.png' fill priority className='object-contain' />
        </Link>
      }
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-2 cursor-pointer'
      >
        <div className='w-8 h-8 aspect-square relative rounded-full'>
          <div className='w-10 h-10 rounded-full bg-primary flex justify-center items-center'>
            <p className='text-white font-bold uppercase'>
              {profile?.firstName[0]}
            </p>
          </div>
        </div>
        <span className='hidden text-left lg:block mt-2 ml-2'>
          <span className='block text-sm font-medium text-blackLight capitalize truncate w-24'>
            {user?.displayName || profile?.firstName + ' ' + profile?.lastName}
          </span>
        </span>
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 shadow-xl flex-col rounded-sm border border-stroke bg-white ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        <Link
          href={ROUTERS.cart}
          className='flex items-center py-4 px-4 text-sm font-normal duration-300 ease-in-out hover:text-primary z-[99] bg-white'
        >
          <div className='w-[20px] h-[20px] relative overflow-hidden '>
            <Image
              alt='Logo'
              src='/images/cart_icon.png'
              fill
              priority
              className='object-contain rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
            />
          </div>
          <span className='ml-2'>Giỏ hàng</span>
        </Link>
        <Link
          href={ROUTERS.order}
          className='flex items-center py-4 px-4 text-sm font-normal duration-300 ease-in-out hover:text-primary z-[99] bg-white'
        >
          <div className='w-[20px] h-[20px] relative overflow-hidden '>
            <Image
              alt='Logo'
              src='/images/order_icon.png'
              fill
              priority
              className='object-contain rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-500'
            />
          </div>
          <span className='ml-2'>Đơn hàng</span>
        </Link>
        <button
          onClick={() => logout()}
          className='flex items-center py-4 px-4 text-sm font-normal duration-300 ease-in-out hover:text-primary z-[99] bg-white'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2'
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            ></path>
          </svg>
          <span className='ml-2'>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
