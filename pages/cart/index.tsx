import { Container, LoadingPage } from '@/components';
import withAuth from '@/components/AuthHOC';
import { Footer, NavBar } from '@/sections';
import { NextPage } from 'next';
import useChapter from '@/pages/product/hooks';
import Image from 'next/image';
import ProductBlock from '@/sections/ProductBlock';
import { PRODUCTS_CHILD } from '../home';
import Link from 'next/link';
import { ROUTERS } from '@/constants';
import useCart from './hooks';
import CartItem from './components/CartItem';
// ico_emptycart.svg
const CartPage: NextPage = () => {
  const { cart, profile, cartDetails, getTotalPrice } = useCart();
  return (
    <Container headTitle={`Sản phẩm`} className='flex flex-col'>
      <NavBar />
      {/* {loading && <LoadingPage />} */}

      <div className='flex flex-col p-10 bg-[#F0F0F0]'>
        <div className='flex gap-2 mb-2 items-center'>
          <span className='uppercase hover:text-red-300 text-sm cursor-pointer truncate'>
            Giỏ hàng ({cart.length} sản phẩm)
          </span>
        </div>

        {!profile && (
          <div className='flex gap-4 flex-col justify-center items-center bg-white p-12 mt-2 rounded-lg min-h-[472px]'>
            <span>Đăng nhập để thực hiện chức năng này!</span>
            <Link
              href={ROUTERS.login}
              className='text-[#C92127] h-[42px] px-8 hover:opacity-80 rounded-md py-2 font-semibold border-2 border-[#C92127] capitalize bg-white'
            >
              Đăng nhập
            </Link>
          </div>
        )}

        {cart.length == 0 && profile && (
          <div className='flex gap-4 justify-center items-center bg-white p-12 mt-2 rounded-lg min-h-[472px]'>
            <div className='flex flex-col w-full h-full gap-6 justify-center items-center'>
              <div className='w-[160px] h-[160px] relative'>
                <Image
                  alt='Logo'
                  src='/images/ico_emptycart.svg'
                  fill
                  priority
                  className='object-cover rounded-lg cursor-pointer'
                />
              </div>
              <span>Bạn chưa có sản phẩm nào</span>
              <Link
                href={ROUTERS.home}
                className='text-[#C92127] h-[42px] px-8 hover:opacity-80 rounded-md py-2 font-semibold border-2 border-[#C92127] capitalize bg-white'
              >
                Mua sắm ngay
              </Link>
            </div>
          </div>
        )}
        {profile && (
          <div className='flex justify-between gap-4 items-start'>
            <div className='bg-white rounded-lg w-3/4 p-6'>
              {cartDetails.map((value) => {
                return <CartItem product={value} />;
              })}
            </div>
            <div className='bg-white rounded-lg w-1/4 p-4'>
              <div className='flex justify-between items-center'>
                <span>Thành tiền</span>
                <span>
                  {getTotalPrice.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </div>
              <div className='bg-gray-200 w-full h-[1px] my-4'></div>
              <div className='flex justify-between items-center'>
                <span className='font-bold text-base'>Tổng</span>
                <span className='font-bold text-base text-red-500'>
                  {getTotalPrice.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </div>
              <Link href={ROUTERS.checkout} className='flex justify-center items-center mt-8 w-full capitalize bg-[#C92127] h-[42px] hover:opacity-80 px-8 rounded-md py-2 box-border font-semibold text-white'>
                Thanh Toán
              </Link>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </Container>
  );
};

export default CartPage;
