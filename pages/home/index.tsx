import { Container } from '@/components';
import withAuth from '@/components/AuthHOC';
import { BirdsEyeOverview, Footer, NavBar } from '@/sections';
import { NextPage } from 'next';
import useHomeHooks from './hooks';
import Banner from '@/sections/Banner';
import ProductBlock from '@/sections/ProductBlock';
import { IProduct } from '@/utils/interfaces';
import Logos from '@/sections/Logos';

// export const PRODUCTS_CHILD: IProduct[] = [
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   },
//   {
//     id: 'product_01',
//     name: 'Combo Sách Giáo Trình Chuẩn HSK 3 - Sách Bài Học Và Bài',
//     price: 50000,
//     discount: 10,
//     imageUrl: PRODUCT_01,
//     sold: 10,
//     category: {
//       id: '10',
//       imageUrl: '',
//       name: 'Thiếu nhi'
//     }
//   }
// ]
export const PRODUCTS_CHILD = [];
const HomePage: NextPage = () => {
  const { categories, dataProducts } = useHomeHooks();
  
  return (
    <Container headTitle='Home' className='flex flex-col'>
      <NavBar />
      <div className='px-10 pt-4 flex flex-col gap-4 bg-[#F0F0F0]'>
        <Banner categories={categories}/>
        {dataProducts.length > 0 && categories.map((category, index) => {
          return (
            <ProductBlock products={dataProducts[index]} title={category.name} />
          );
        })}
        <Logos />
      </div>
      <Footer />
    </Container>
  );
};

export default HomePage;
