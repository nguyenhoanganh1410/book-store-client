import { Container, LoadingPage } from '@/components';
import withAuth from '@/components/AuthHOC';
import { Footer, NavBar } from '@/sections';
import { NextPage } from 'next';
import useChapter from '@/pages/product/hooks';
import Image from 'next/image';
import ProductBlock from '@/sections/ProductBlock';
import { PRODUCTS_CHILD } from '../home';
import Link from 'next/link';

const DetailChapterPage: NextPage = () => {
  const { loading, product, relatedProducts, currentQuality , handleMinus, handlePluss ,handleAddToCart} = useChapter();
  return (
    <Container headTitle={`Sản phẩm`} className='flex flex-col'>
      <NavBar />
      {loading && <LoadingPage />}

      <div className='flex flex-col p-10 bg-[#F0F0F0]'>
        <div className='flex gap-2 mb-2 items-center'>
          <Link
            href='/home'
            className='uppercase hover:text-red-300 text-sm cursor-pointer'
          >
            Trang chủ
          </Link>
          <span className='uppercase mb-1'>{`>`}</span>
          <span className='uppercase hover:text-red-300 text-sm cursor-pointer truncate'>
            {product?.name || 'Tên sản phẩm'}
          </span>
        </div>

        <div className='flex gap-4 bg-white p-12 mt-2 rounded-lg min-h-[472px]'>
          <div className='w-[40%]'>
            <div className='w-full h-full relative'>
              <Image
                alt='Logo'
                src={
                  product?.images && product?.images.length > 0
                    ? product?.images[0]
                    : ''
                }
                fill
                priority
                className='object-contain rounded-lg cursor-pointer'
              />
            </div>
          </div>
          <div className='w-[60%]'>
            <p className='text-xl mb-6 truncate max-w-2/4'>{product?.name}</p>
            <div className='flex justify-between items-center gap-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>
                  Nhà cung cấp: <span className='font-bold '>KI29275</span>
                </p>
                <p className='text-sm'>
                  Nhà xuất bản: <span className='font-bold'>Dân trí</span>
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-sm'>
                  Tác giả: <span className='font-bold'>KI29275</span>
                </p>
                <p className='text-sm'>
                  Hình thức bìa: <span className='font-bold'>Bìa mềm</span>
                </p>
              </div>
            </div>

            <div className='flex mt-4'>
              <div className='flex gap-2 justify-start items-center'>
                <p className='text-[#C92127] font-bold text-[24px]'>
                  {product?.price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
                {/* <p className='text-gray-400 text-sm mt-1 font-normal line-through'>
                  215.999 đ
                </p>
                <div className='bg-[#C92127] rounded-md p-1 flex justify-center items-center'>
                  <span className='font-semibold text-white text-[10px]'>
                    -22%
                  </span>
                </div> */}
              </div>
            </div>

            <div className='flex justify-between items-center gap-4 mt-6'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>
                  Thời gian giao hàng <span className='ml-5'>2-5 ngày</span>
                </p>
                <p className='text-sm'>
                  Chính sách đổi trả{' '}
                  <span className='ml-7'>Đổi trả sản phẩm trong 30 ngày</span>
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4 mt-6'>
              <p className='text-sm'>Số lượng:</p>
              <div className='flex gap-1 items-center rounded-md border border-gray-300 px-2'>
                <div onClick={handleMinus} className='flex cursor-pointer hover:text-red-300 justify-center items-center text-[32px] w-5 h-5'> - </div>
                <input value={currentQuality} type='number' className='border-none w-[70px]'/>
                <div onClick={handlePluss} className='flex cursor-pointer hover:text-red-300 justify-center items-center text-[22px] w-5 h-5'> + </div>
              </div>
            </div>

            <div className='flex gap-4 mt-8 items-center'>
              <button className='capitalize bg-[#C92127] h-[42px] hover:opacity-80 px-8 rounded-md py-2 box-border font-semibold text-white'>Mua ngay</button>
              <button onClick={handleAddToCart} className='capitalize text-[#C92127] h-[42px] px-8 hover:opacity-80 rounded-md py-2 font-semibold border-2 border-[#C92127] bg-white'>Thêm giỏ hàng</button>
            </div>
          </div>
        </div>

        <div className='pt-4 flex flex-col gap-4'>
          <ProductBlock products={relatedProducts} title='Sản phẩm liên quan' />
        </div>
        <Footer />
      </div>
    </Container>
  );
};

export default DetailChapterPage;
