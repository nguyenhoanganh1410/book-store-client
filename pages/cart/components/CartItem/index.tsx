import Image from 'next/image';
import { ICartProduceDetail } from '@/utils/interfaces';
import { useCardItem } from './hooks';
import { LoadingPage } from '@/components';
import Link from 'next/link';

interface IProps {
  product: ICartProduceDetail;
  hideSelectQuality?: boolean;
  hideDeleteIcon?: boolean;
}

const CartItem = ({ product, hideSelectQuality, hideDeleteIcon }: IProps) => {
  const {
    loading,
    currentQuality,
    handleClickMinus,
    handleClickPluss,
    handleClickDelete,
  } = useCardItem(product);
  return (
    <div className='flex justify-between items-center'>
      {loading && <LoadingPage />}
      <div className='flex items-center gap-4'>
        <div className='w-[140px] h-[160px] relative'>
          <Image
            alt='Logo'
            src={
              product.productImages.length > 0 ? product.productImages[0] : ''
            }
            fill
            priority
            className='object-contain rounded-lg cursor-pointer'
          />
        </div>
        <div className='flex flex-col gap-4 max-w-[160px]'>
          <Link
            href={`/product/${product.productId}`}
            className='text-sm truncate'
          >
            {product.productName}
          </Link>
          <p className='font-semibold text-sm'>
            {product.productPrice.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </div>
      </div>

      {hideSelectQuality ? (
        <input
          value={currentQuality}
          type='text'
          className='border-none w-[70px]'
        />
      ) : (
        <div className='flex items-center gap-4 mt-6'>
          <div className='flex gap-1 items-center rounded-md border border-gray-300 px-2'>
            <div
              onClick={handleClickMinus}
              className='flex cursor-pointer hover:text-red-300 justify-center items-center text-[32px] w-4 h-4'
            >
              -
            </div>
            <input
              value={currentQuality}
              type='number'
              className='border-none w-[70px]'
            />
            <div
              onClick={handleClickPluss}
              className='flex cursor-pointer hover:text-red-300 justify-center items-center text-[22px] w-4 h-4'
            >
              +
            </div>
          </div>
        </div>
      )}

      <span className='font-bold text-base text-red-500 mt-4'>
        {(product.productPrice * product.quality).toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </span>
      {!hideDeleteIcon && (
        <div
          onClick={handleClickDelete}
          className='w-[20px] cursor-pointer h-[20px] relative mt-4'
        >
          <Image
            alt='Logo'
            src='/images/delete_icon.png'
            fill
            priority
            className='object-cover rounded-lg cursor-pointer'
          />
        </div>
      )}
    </div>
  );
};

export default CartItem;
