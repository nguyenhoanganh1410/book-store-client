import { db } from '@/firebase';
import { ICart } from '@/utils/interfaces';
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
  } from 'firebase/firestore';

  
  export const getProductsInCart = async (userId: string) => {
    const q = query(
      collection(db, 'cart'),
      where('deleted', '==', false),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((it) => ({
      id: it.id,
      ...it.data(),
    })) as ICart[];
  };
  
  export const addToCart = async (productId: string, userId: string, quality: number) => {
    const commentDocument = await addDoc(collection(db, 'cart'), {
      createdAt: Timestamp.now(),
      productId: productId,
      userId: userId,
      quality: quality,
      deleted: false
    });
    return commentDocument;
  };
  
  export const deleteProductInCart = async (id: string) => {
    const cartRef = doc(db, 'cart', id);
    return await deleteDoc(cartRef);
  };
  
  export const updateProductInCart = async (id: string, productParams: any) => {
    const userRef = doc(db, 'cart', id);
    return await updateDoc(userRef, productParams);
  };
  
  export const getCartByProductId = async (productId: string) => {
    const q = query(
      collection(db, 'cart'),
      where('productId', '==', productId),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((it) => ({
      id: it.id,
      ...it.data(),
    }));
  };