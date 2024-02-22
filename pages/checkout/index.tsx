import { Container, ErrorMessageForm, LoadingPage } from '@/components';
import { Footer, NavBar } from '@/sections';
import { NextPage } from 'next';
import { useCheckoutHooks } from './hooks';
import { Formik } from 'formik';
import CartItem from '../cart/components/CartItem';
import * as Yup from 'yup';

const CheckoutPage: NextPage = () => {
  const { initialValues, onSubmit, cartDetails } = useCheckoutHooks();
  return (
    <Container headTitle={`Sản phẩm`} className='flex flex-col'>
      <NavBar />
      <Formik
        validationSchema={SignInSchema}
        initialValues={initialValues}
        validateOnMount={false}
        onSubmit={onSubmit}
      >
        {(props) => (
          <div className='flex flex-col p-10 bg-[#F0F0F0]'>
            <div className='w-full rounded-lg bg-white p-8'>
              <p className='font-semibold'>Địa chỉ giao hàng</p>
              <div className='w-full h-[1px] bg-gray-200 my-4'></div>
              <form onSubmit={props.handleSubmit} className='w-2/4'>
                <p className='text-sm font-medium text-gray20'>Người nhận</p>
                <div className='flex mt-2 flex-row justify-center items-center relative'>
                  <input
                    className={`w-full rounded-lg border border-lightGray text-base font-normal text-gray20`}
                    name='fullName'
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.fullName}
                    placeholder='Nhập họ tên người nhận'
                  />
                </div>
                <ErrorMessageForm name='fullName' />

                <p className='text-sm font-medium text-gray20 mt-4'>Email</p>
                <div className='flex mt-2 flex-row justify-center items-center relative'>
                  <input
                    className={`w-full rounded-lg border border-lightGray text-base font-normal text-gray20`}
                    name='email'
                    type='email'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    placeholder='user@example.com'
                  />
                </div>
                <ErrorMessageForm name='email' />

                <p className='text-sm font-medium text-gray20 mt-4'>
                  Số điện thoại
                </p>
                <div className='flex mt-2 flex-row justify-center items-center relative'>
                  <input
                    className={`w-full rounded-lg border border-lightGray text-base font-normal text-gray20`}
                    name='phoneNumber'
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.phoneNumber}
                    placeholder='Ví dụ: 0398767xxx (10 ký tự số)'
                  />
                </div>
                <ErrorMessageForm name='phoneNumber' />

                <p className='text-sm font-medium text-gray20 mt-4'>Địa chỉ</p>
                <div className='flex mt-2 flex-row justify-center items-center relative'>
                  <input
                    className={`w-full rounded-lg border border-lightGray text-base font-normal text-gray20`}
                    name='address'
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.address}
                    placeholder='Nhập địa chỉ'
                  />
                </div>
                <ErrorMessageForm name='address' />
              </form>
            </div>

            <div className='w-full rounded-lg bg-white p-8 mt-4'>
              <p className='font-semibold'>Phương thức thanh toán</p>
              <div className='w-full h-[1px] bg-gray-200 my-4'></div>
              <div className='flex gap-2 items-center'>
                <input type='checkbox' checked={true} />
                <label className='text-sm'>Thanh toán khi nhận hàng</label>
              </div>
            </div>

            <div className='w-full rounded-lg bg-white p-8 mt-4'>
              <p className='font-semibold'>Kiểm tra lại đơn hàng</p>
              <div className='w-full h-[1px] bg-gray-200 my-4'></div>
              <div className='flex flex-col gap-6'>
                {cartDetails.map((value) => {
                  return (
                    <CartItem
                      product={value}
                      hideSelectQuality
                      hideDeleteIcon
                    />
                  );
                })}
              </div>
            </div>
            <div className='flex gap-4 mt-8 items-center justify-center'>
              <button type='button' onClick={() => props.handleSubmit()} className='capitalize bg-[#C92127] h-[42px] hover:opacity-80 px-8 rounded-md py-2 box-border font-semibold text-white'>
                Đặt đơn
              </button>
            </div>
          </div>
        )}
      </Formik>
      <Footer />
    </Container>
  );
};

const SignInSchema = Yup.object().shape({
  fullName: Yup.string().required('This field is required'),
  address: Yup.string().required('This field is required'),
  phoneNumber: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
 
});

export default CheckoutPage;
