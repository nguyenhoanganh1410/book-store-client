import { Field, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessageForm } from '..';
import { useSignUpFormHooks } from './hooks';

interface IProps {}

const SignUpForm: FC<IProps> = () => {
  const {
    inititalValues,
    showConfirmPassword,
    showPassword,
    onSubmitForm,
    onClickSignIn,
    onResetValueEmail,
    onToggleShowConfirmPassword,
    onToggleShowPassword,
  } = useSignUpFormHooks();

  return (
    <div className='flex flex-col justify-center items-center  max-w-sm w-full pb-8'>
      <div>
        <p
          className={`text-[28px] capitalize sm:text-[30px] font-bold text-center text-gray20`}
        >
          Tạo tài khoản
        </p>
        <p
          className={`mt-2 text-[15px] sm:text-base font-normal text-gray20/70 text-center`}
        >
          Điền thông tin bên dưới để tạo tài khoản
        </p>
        <div className='mt-8'>
          <Formik
            validationSchema={SignInSchema}
            initialValues={inititalValues}
            validateOnMount={false}
            onSubmit={onSubmitForm}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div>
                  <p className={`text-sm mt-5 font-medium text-gray20`}>
                    First name
                  </p>
                  <input
                    className={`mt-2 w-full bg-transparent rounded-lg border border-gray20 text-gray20 placeholder:text-gray20 text-base font-normal pr-10`}
                    name='firstName'
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstName}
                    placeholder='First Name'
                  />
                </div>
                <ErrorMessageForm name='firstName' />
                <div>
                  <p className={`text-sm mt-5 font-medium text-gray20`}>
                    Last name
                  </p>
                  <input
                    className={`mt-2 w-full bg-transparent rounded-lg border border-gray20 text-gray20 placeholder:text-gray20 text-base font-normal pr-10`}
                    name='lastName'
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.lastName}
                    placeholder='Last Name'
                  />
                </div>
                <ErrorMessageForm name='lastName' />
                <div>
                  <p className={`text-sm mt-5 font-medium text-gray20`}>
                    Email
                  </p>
                  <div className='flex mt-2 flex-row justify-center items-center relative'>
                    <input
                      className={`w-full bg-transparent rounded-lg border border-gray20 text-gray20 placeholder:text-gray20 text-base font-normal pr-10`}
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
                </div>
                <ErrorMessageForm name='email' />

                <div>
                  <p className={`text-sm mt-5 font-medium text-gray20`}>
                    Password
                  </p>
                  <div className='flex mt-2 flex-row justify-center items-center relative'>
                    <input
                      className={`w-full bg-transparent rounded-lg border border-gray20 text-gray20 placeholder:text-gray20 text-base font-normal pr-10`}
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
                </div>
                <ErrorMessageForm name='password' />
                <div>
                  <p className={`text-sm mt-5 font-medium text-gray20`}>
                    Confirm Password
                  </p>
                  <div className='flex mt-2 flex-row justify-center items-center relative'>
                    <input
                      className={`w-full bg-transparent rounded-lg border border-gray20 text-gray20 placeholder:text-gray20 text-base font-normal pr-10`}
                      name='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.confirmPassword}
                      placeholder='password'
                    />
                    <FontAwesomeIcon
                      onClick={onToggleShowConfirmPassword}
                      icon={
                        showConfirmPassword
                          ? ['far', 'eye']
                          : ['far', 'eye-slash']
                      }
                      className={`text-gray20 absolute right-4 cursor-pointer`}
                    />
                  </div>
                </div>
                <ErrorMessageForm name='confirmPassword' />
                {/* <div className="mt-5 flex flex-row items-center">
                  <Field className="border-gray20 rounded-[4px] bg-transparent"
                    name="rememberMe"
                    type="checkbox"
                  />
                  <p className={`ml-2 text-sm font-medium text-gray20`}>
                    Remember me
                  </p>
                </div> */}
                <button
                  type='submit'
                  className='mt-8 w-full h-11 bg-primary rounded-lg '
                >
                  <p className='text-base font-medium text-white font-Poppins'>
                    Đăng Ký
                  </p>
                </button>
                <p
                  className={`mt-4 text-center text-sm font-normal text-gray20`}
                >
                  Bạn đã có tài khoản?
                  <p
                    className={`text-primary inline font-medium cursor-pointer`}
                    onClick={onClickSignIn}
                  >
                    {' '}
                    Đăng nhập
                  </p>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const SignInSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string()
    .required('This field is required')
    .min(8, 'Password at least 8 characters'),
  confirmPassword: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

export default SignUpForm;
