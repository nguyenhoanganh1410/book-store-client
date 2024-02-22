import { useCallback, useEffect, useMemo, useState } from 'react';
import { getChapter } from '@/queries/chapters';
import { Chapter } from '@/queries/type';
import { useRouter } from 'next/router';
import { ICart, ICartProduceDetail, IProduct } from '@/utils/interfaces';
import { getProductById, getProductsByCategoryId } from '@/queries/products';
import { toastError, toastSuccess } from '@/utils';
import { MESSAGE_UNKNOWN_ERROR } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import {
  addToCart,
  getCartByProductId,
  getProductsInCart,
  updateProductInCart,
} from '@/queries/cart';
import { db } from '@/firebase';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

export const useCart = () => {
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
            productId: value.productId
          };

        return {
          id: value.id,
          userId: value.userId,
          quality: value.quality,
          productName: data[index]?.name || '',
          productImages: data[index]?.images || [],
          productPrice: data[index]?.price || 0,
          productId: value.productId
        };
      });
      setCartDetails(newData);
    }
  }, [cart]);

  const getTotalPrice = useMemo(() => {
    return cartDetails.reduce((accumulate, currentValue) => {
      return accumulate + currentValue.quality * currentValue.productPrice;
    }, 0);
  }, [cartDetails]);

  useEffect(() => {
    getProductDetails();
  }, [cart]);

  useEffect(() => {
    profile && getCart();
  }, [profile]);

  return { cart, profile, getTotalPrice, cartDetails };
};
