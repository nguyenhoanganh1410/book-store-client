import { Field, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessageForm } from '..';
import { useLoginFormHooks } from './hooks';
import Image from 'next/image';
import { LOGO_URL } from '@/sections/NavBar';

interface IProps {}

const LoginForm: FC<IProps> = ({}) => {
  const {
    initialValues,
    initialResetPasswordValues,
    showPassword,
    isRequestingResetPassword,
    onSubmitForm,
    onClickSignUp,
    onResetValueEmail,
    onToggleShowPassword,
    onForgotPassword,
    onSubmitResetPasswordForm,
    onCloseResetPasswordForm,
  } = useLoginFormHooks();

  return (
    <div className='flex flex-col justify-center items-center max-w-sm w-full h-full'>
      <div>
        {isRequestingResetPassword ? (
          <>
            <p
              className={`text-[28px] sm:text-[30px] font-bold text-gray20 text-center`}
            >
              Đổi Mật Khẩu
            </p>
            <p
              className={`mt-2 text-[15px] sm:text-base font-normal text-center text-gray20/80`}
            >
              Nhập email để lấy lại mật khẩu mới của bạn
            </p>
          </>
        ) : (
          <>
          {/* <div className='w-12 h-12 sm:w-16 sm:h-16 lg:h-20 lg:w-60 relative'>
            <Image alt='Logo' src={LOGO_URL} fill priority className='object-contain' />
          </div> */}
            <p
              className={`text-2xl font-bold text-[#2B2B2B] text-start mt-4 md:mt-8 xl:mt-10 2xl:mt-12`}
            >
              Đăng nhập
            </p>
            <p
              className={`mt-2 text-sm font-normal text-start text-blueLight`}
            >
              Hãy điền đầy đủ thông tin để đăng nhập
            </p>
          </>
        )}
        {isRequestingResetPassword ? (
          <Formik
            validationSchema={ResetPasswordSchema}
            initialValues={initialResetPasswordValues}
            validateOnMount={false}
            onSubmit={onSubmitResetPasswordForm}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit} className='mt-8'>
                <p className='text-sm font-medium text-gray20'>Email</p>
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
                <button
                  type='submit'
                  className='mt-8 w-full h-11 bg-orange rounded-lg '
                >
                  <p className='text-base font-medium text-gray20'>
                    Gửi
                  </p>
                </button>
                <p
                  onClick={onCloseResetPasswordForm}
                  className='text-base font-medium text-gray20 text-center mt-4 underline cursor-pointer'
                >
                  Đăng nhập
                </p>
              </form>
            )}
          </Formik>
        ) : (
          <div className='mt-4'>
            <Formik
              validationSchema={SignInSchema}
              initialValues={initialValues}
              validateOnMount={false}
              onSubmit={onSubmitForm}
              // onSubmit={() => {}}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <p className={`text-sm font-medium text-gray20`}>Email</p>
                  <div className='flex mt-2 flex-row justify-center items-center relative'>
                    <input
                      className={`w-full bg-white rounded-lg border border-[#D1D5DB] text-[#2B2B2B] placeholder:text-[#2B2B2B] lg:placeholder:text-accent text-base font-normal pr-10`}
                      name='email'
                      type='email'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      placeholder='user@example.com'
                    />
                    <FontAwesomeIcon
                      onClick={onResetValueEmail(props)}
                      icon={['far', 'circle-xmark']}
                      className={`text-gray20  absolute right-4 cursor-pointer`}
                    />
                  </div>
                  <ErrorMessageForm name='email' />
                  <p className={`mt-5 text-sm font-medium text-gray20`}>
                    Password
                  </p>
                  <div className='flex mt-2 flex-row justify-center items-center relative'>
                    <input
                      className={`w-full bg-white rounded-lg border border-[#D1D5DB] text-[#2B2B2B] placeholder:text-[#2B2B2B] lg:placeholder:text-accent text-base font-normal pr-10`}
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      placeholder='password'
                    />
                    <FontAwesomeIcon
                      onClick={onToggleShowPassword}
                      icon={
                        showPassword ? ['far', 'eye'] : ['far', 'eye-slash']
                      }
                      className={`text-gray20  absolute right-4 cursor-pointer`}
                    />
                  </div>
                  <ErrorMessageForm name='password' />
                  <div className='mt-5 flex flex-row items-center justify-end'>
                    <p
                      onClick={onForgotPassword}
                      className={`text-blueLight text-sm font-medium cursor-pointer`}
                    >
                      Quên mật khẩu?
                    </p>
                  </div>
                  <button
                    type='submit'
                    className='mt-4 w-full h-11 bg-blueLight rounded-lg '
                  >
                    <p className='text-base font-medium text-white font-DMSans'>
                      Đăng Nhập
                    </p>
                  </button>
                  <p
                    className={`mt-4 text-center text-sm font-normal text-gray20`}
                  >
                    Bạn chưa có tài khoản?{' '}
                    <p
                      className={`text-blueLight inline font-medium cursor-pointer`}
                      onClick={onClickSignUp}
                    >
                      Đăng ký
                    </p>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string()
    .required('This field is required')
    .min(8, 'Password at least 8 characters'),
});

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required'),
});

export default LoginForm;
