import { useCallback, useEffect, useState } from 'react';
import { getChapter } from '@/queries/chapters';
import { Chapter } from '@/queries/type';
import { useRouter } from 'next/router';
import { ICart, IProduct } from '@/utils/interfaces';
import { getProductById, getProductsByCategoryId } from '@/queries/products';
import { toastError, toastSuccess } from '@/utils';
import { MESSAGE_UNKNOWN_ERROR } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { addToCart, getCartByProductId, getProductsInCart, updateProductInCart } from '@/queries/cart';
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


const useChapter = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  const [currentQuality, setCurrentQuality] = useState<number>(1);
  const { profile } = useAuthState();
  const [cart, setCart] = useState<ICart[]>([]);
 
  const handleMinus = useCallback(() => {
    if(currentQuality === 1) return;
    setCurrentQuality(currentQuality - 1);
  }, [currentQuality]);

  const handlePluss = useCallback(() => {
    setCurrentQuality(currentQuality + 1);
  }, [currentQuality]);

  const handleAddToCart = useCallback(async () => {
    //TODO - call api add to cart
    if(!profile) {
      toastError('Bạn cần đăng nhâp để thực hiện chức năng này!');
      return;
    }
   try {
    setLoading(true);
    const index = cart.findIndex(val => val.productId === productId);
    if(index == -1) {
      await addToCart(productId, profile.uid, currentQuality);
    } else {
      await updateProductInCart(cart[index].id, {quality: cart[index].quality + currentQuality});
    }
    toastSuccess('Đã thêm sản phẩm vào giỏ hàng!');
    setCurrentQuality(1);
   } catch (error) {
    console.log(error);
    toastError(MESSAGE_UNKNOWN_ERROR);
   } finally {
    setLoading(false);
   }
  }, [currentQuality, product, profile, cart]);

  const getProduct = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.log(error);
      toastError(MESSAGE_UNKNOWN_ERROR);
    } finally {
      setLoading(false)
    }
  }, []);

  const getRelatedProducts = useCallback(async () => {
    try {
      const data = await getProductsByCategoryId(product?.category || '');
      setRelatedProducts(data)
    } catch (error) {
      console.log(error);
    }
  }, [product]);

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

  useEffect(() => {
    profile && getCart()
  }, [profile]);

  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId]);

  useEffect(() => {
    if(product?.category) getRelatedProducts();
  }, [product])

  return {
    product,
    loading,
    currentQuality,
    relatedProducts,
    handleAddToCart,
    handleMinus,
    handlePluss
  };
};

export default useChapter;
