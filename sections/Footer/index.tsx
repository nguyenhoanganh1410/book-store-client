import { FacebookIcon, LinkedinIcon, LogoIcon, TwitterIcon } from '@/icons';
import Image from 'next/image';
import { FC } from 'react';
const LOGO_URL = '/images/fahasa-logo.png';
const Footer: FC = () => {
  return (
    <div className='p-12 w-full flex flex-col space-y-10 sm:space-y-0 sm:flex-row sm:space-x-28 bg-white mt-12'>
      <div className='flex flex-col justify-between items-start gap-4 max-w-xs'>
        <div className='w-12 h-12 sm:w-16 sm:h-16 lg:h-20 lg:w-48 relative'>
          <Image
            alt='Logo'
            src={LOGO_URL}
            fill
            priority
            className='object-contain'
          />
        </div>
        <p className='font-normal text-sm text-gray-600'>
          Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM <br />
          Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA60 - 62 Lê Lợi, Quận 1,
          TP. HCM, Việt Nam
        </p>
        <p className='font-normal text-sm text-gray-600'>
          Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ
          đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống
          Fahasa trên toàn quốc.
        </p>
        <div className='flex-row items-center space-x-6 sm:flex hidden mt-4'>
          <TwitterIcon className='w-10 h-10 2xl:w-12 2xl:h-12 cursor-pointer' />
          <FacebookIcon className='w-10 h-10 2xl:w-12 2xl:h-12 cursor-pointer' />
          <LinkedinIcon className='w-10 h-10 2xl:w-12 2xl:h-12 cursor-pointer' />
        </div>
        <p className='text-sm font-normal text-tertiaryText sm:flex hidden mt-4'>
          © 2024 Fahasa, inc.
        </p>
      </div>
      <div className='flex flex-row sm:space-x-28 justify-between'>
        <div className='flex flex-col'>
          <p className='text-primaryText font-bold mb-4 text-lg'>Dịch vụ</p>
          <div className='flex flex-col text-primaryText font-normal space-y-4 text-base'>
            <p className='cursor-pointer'>Điều khoản sử dụng</p>
            <p className='cursor-pointer'>Hệ thống trung tâm - nhà sách</p>
            <p className='cursor-pointer'>Chính sách bảo mật thanh toán</p>
            <p className='cursor-pointer'>Chính sách bảo mật thông tin cá nhân</p>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-primaryText font-bold mb-4 text-lg'>HỖ TRỢ</p>
          <div className='flex flex-col text-primaryText font-normal space-y-4 text-base'>
            <p className='cursor-pointer'>Điều khoản sử dụng</p>
            <p className='cursor-pointer'>Hệ thống trung tâm - nhà sách</p>
            <p className='cursor-pointer'>Chính sách bảo mật thanh toán</p>
            <p className='cursor-pointer'>Chính sách bảo mật thông tin cá nhân</p>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-primaryText font-bold mb-4 text-lg'>TÀI KHOẢN CỦA TÔI</p>
          <div className='flex flex-col text-primaryText font-normal space-y-4 text-base'>
            <p className='cursor-pointer'>Điều khoản sử dụng</p>
            <p className='cursor-pointer'>Hệ thống trung tâm - nhà sách</p>
            <p className='cursor-pointer'>Chính sách bảo mật thanh toán</p>
            <p className='cursor-pointer'>Chính sách bảo mật thông tin cá nhân</p>
          </div>
        </div>
      
      </div>

      <div className='flex flex-col items-center space-y-6 sm:hidden'>
        <div className='flex flex-row items-center space-x-6'>
          <TwitterIcon className='w-10 h-10 2xl:w-12 2xl:h-12 cursor-pointer' />
          <FacebookIcon className='w-10 h-10 2xl:w-12 2xl:h-12 cursor-pointer' />
          <LinkedinIcon className='w-10 h-10 2xl:w-12 2xl:h-12 cursor-pointer' />
        </div>
        <p className='text-base font-normal text-tertiaryText'>
          © 2023 Habit Ally, inc.
        </p>
      </div>
    </div>
  );
};

export default Footer;
