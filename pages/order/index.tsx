import { Container, LoadingPage } from '@/components';
import withAuth from '@/components/AuthHOC';
import { Footer, NavBar } from '@/sections';
import { NextPage } from 'next';
import useOrderHooks from './hooks';
import { orderStatus } from '@/constants';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image: 'https://bit.ly/33HnjK0',
  },
  {
    name: 'John Doe',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Tester',
    email: 'john.doe@example.com',
    image: 'https://bit.ly/3I9nL2D',
  },
  {
    name: 'Veronica Lodge',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: ' Software Engineer',
    email: 'veronica.lodge@example.com',
    image: 'https://bit.ly/3vaOTe1',
  },
  // More people...
];

export function formatCash(str: any) {
  const data = str
    .toString()
    .split('')
    .reverse()
    .reduce((prev: any, next: any, index: any) => {
      return (index % 3 ? next : next + ',') + prev;
    });

  return data + ' ' + 'đ';
}

const OrderPage: NextPage = () => {
  const { orders } = useOrderHooks();
  return (
    <Container headTitle={`Các đơn hàng của tôi`} className='flex flex-col'>
      <NavBar />
      <div className='flex flex-col p-10 bg-[#F0F0F0]'>
        <div className='w-full bg-white rounded-lg p-8'>
          <div className='container my-order-container'>
            <h4>Danh sách các đơn hàng</h4>
            <div className='w-full h-[1px] bg-slate-200 my-4'></div>

            <div className='flex flex-col'>
              <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Mã đơn hàng
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Họ và tên
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Địa chỉ
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Số ĐT
                          </th>

                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Tổng tiền
                          </th>

                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Trạng thái
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {orders.map((person) => {
                          const handleStatus = () => {
                            if (person.status === orderStatus.newOrder)
                              return 'Chờ xác nhận';
                            else if (person.status === orderStatus.shipping)
                              return 'Đang giao hàng';
                            else if (person.status === orderStatus.pending)
                              return 'Đang làm món';
                            else return 'Hoàn thành';
                          };
                          return (
                            <tr key={person.email}>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                  <td className='py-4 whitespace-nowrap'>
                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                      {person.id}
                                    </span>
                                  </td>
                                </div>
                              </td>
                              <div className='ml-4 py-4'>
                                <div className='text-sm font-medium text-gray-900 capitalize'>
                                  {person.fullName}
                                </div>
                                <div className='text-sm text-gray-500'>
                                  {person.email}
                                </div>
                              </div>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-900'>
                                  {person.address}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {person.phone}
                                </div>
                              </td>

                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                {formatCash(person.total)}
                              </td>  
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                {handleStatus()}
                              </td>
                             
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <table className='w-full table-auto'>
              <thead className='w-full'>
                <tr className='w-full flex gap-2'>
                  <th className='w-[14%]'>Mã đơn hàng</th>
                  <th className='w-[14%]'>Họ và tên</th>
                  <th className='w-[14%]'>Địa chỉ</th>
                  <th className='w-[14%]'>Số điện thoại</th>
                  <th className='w-[14%]'>Email</th>
                  <th className='w-[14%]'>Tổng tiền</th>
                  <th className='w-[14%]'>Trạng thái</th>
                </tr>
              </thead>
              <tbody className='w-full'>
                {orders?.map((order) => {
                  const handleStatus = () => {
                    if (order.status === orderStatus.newOrder)
                      return 'Chờ xác nhận';
                    else if (order.status === orderStatus.shipping)
                      return 'Đang giao hàng';
                    else if (order.status === orderStatus.pending)
                      return 'Đang làm món';
                    else return 'Hoàn thành';
                  };
                  return (
                    <tr className='w-full flex gap-2'>
                      <td className='w-[14%]'>{order.id}</td>
                      <td className='w-[14%]'>{order.fullName}</td>
                      <td className='w-[14%]'>{order.address}</td>
                      <td className='w-[14%]'>{order.phone}</td>
                      <td className='w-[14%]'>{order.email}</td>

                      <td className='w-[14%]'>{formatCash(order.total)}</td>
                      <td className='w-[14%]'>{handleStatus()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

export default withAuth(OrderPage, 'all');
