import { ROUTERS, orderStatus } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { db } from '@/firebase';
import { deleteProductInCart } from '@/queries/cart';
import { addOrder } from '@/queries/orders';
import { getProductById } from '@/queries/products';
import { toastError, toastSuccess } from '@/utils';
import { ICart, ICartProduceDetail, IOrder } from '@/utils/interfaces';
import { IAddOrder } from '@/utils/interfaces/order';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { FormikProps } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useCheckoutHooks = () => {
  const router = useRouter();

  const [cart, setCart] = useState<ICart[]>([]);
  const [cartDetails, setCartDetails] = useState<ICartProduceDetail[]>([]);
  const { profile } = useAuthState();

  const getCart = useCallback(() => {
    try {
      const q = query(
        collection(db, 'cart'),
        where('deleted', '==', false),
        where('userId', '==', profile?.uid),
        orderBy('createdAt', 'desc')
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ICart[];
        setCart(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  const getProductDetails = useCallback(async () => {
    if (cart.length > 0) {
      const promises = cart.map((value) => getProductById(value.productId));
      const data = await Promise.all(promises);
      const newData = cart.map((value) => {
        const index = data.findIndex((v) => v?.id === value.productId);
        if (index == -1)
          return {
            id: value.id,
            userId: value.userId,
            quality: value.quality,
            productName: '',
            productImages: [],
            productPrice: 0,
            productId: value.productId,
          };

        return {
          id: value.id,
          userId: value.userId,
          quality: value.quality,
          productName: data[index]?.name || '',
          productImages: data[index]?.images || [],
          productPrice: data[index]?.price || 0,
          productId: value.productId,
        };
      });
      setCartDetails(newData);
    }
  }, [cart]);

  useEffect(() => {
    getProductDetails();
  }, [cart]);

  useEffect(() => {
    profile && getCart();
  }, [profile]);
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  };

  const getTotalPrice = useMemo(() => {
    return cartDetails.reduce((accumulate, currentValue) => {
      console.log(currentValue);
      
      return accumulate + currentValue.quality * currentValue.productPrice;
    }, 0);
  }, [cartDetails]);

  const onSubmit = useCallback(async (values: any) => {
    try {
      const dataParams: IAddOrder = {
        email: values.email,
        fullName: values.fullName,
        address: values.address,
        phone: values.phoneNumber,
        owner: profile?.uid || '',
        total: getTotalPrice,
        status: orderStatus.newOrder,
        payment: false,
        products: cartDetails.map((val) => {
          return {
            userId: val.userId,
            productName: val.productName,
            productPrice: val.productPrice.toString(),
            quality: val.quality,
            productImages: val.productImages,
            productId: val.productId,
          };
        }),
      };
      await addOrder(dataParams);
      console.log('deleted cart!');
      
      //delete cart
      const promises = cart.map((val) => deleteProductInCart(val.id));
      await Promise.all(promises);
      toastSuccess('Đặt đơn thành công!');
      router.push(ROUTERS.order);
    } catch (error) {
      console.log(error);
      toastError((error as any).message);
    }
  }, [cartDetails, cart]);

  return {
    router,
    onSubmit,
    initialValues,
    cartDetails,
  };
};

export default useCheckoutHooks;