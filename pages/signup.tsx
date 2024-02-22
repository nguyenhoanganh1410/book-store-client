import { Container, LoginForm, SignUpForm } from '@/components';
import withAuth from '@/components/AuthHOC';
import { Footer } from '@/sections';
import NavBar, { LOGO_URL } from '@/sections/NavBar';
import { NextPage } from 'next';
import Image from 'next/image';

const SignUpClientPage: NextPage = () => {
  return (
    <Container headTitle='Sign Up'>
      <NavBar />
      <div className='px-10 pt-4 flex flex-col gap-4 bg-[#F0F0F0]'>
        <div className='bg-white w-full flex justify-center my-8 items-center py-4 rounded-lg'>
          <SignUpForm />
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default withAuth(SignUpClientPage, 'auth');
