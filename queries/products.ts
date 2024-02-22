import { db } from '@/firebase';
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Tables } from '@/utils/enums';
import { IProduct } from '@/utils/interfaces';

export const getProductsByCategoryId = async (
  categoryId: string,
  _limit?: number
): Promise<IProduct[]> => {
  const q = query(
    collection(db, Tables.products),
    where('deleted', '==', false),
    where('status', '==', 'active'),
    where('category', '==', categoryId),
    orderBy('createdAt', 'desc'),
    limit(12)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  })) as IProduct[];
};

export const getProductById = async (
  chapterId: string
): Promise<IProduct | null> => {
  const docRef = doc(db, Tables.products, chapterId);
  const result = await getDoc(docRef);
  if (result.exists()) {
    return {
      ...result.data(),
      id: chapterId
    } as IProduct;
  } else {
    return null;
  }
};

export const deleteProduct = async (productId: string) => {
  const userRef = doc(db, Tables.products, productId);
  return await updateDoc(userRef, { deleted: true });
};

export const updatedProduct = async (productId: string, productParams: any) => {
  const userRef = doc(db, Tables.products, productId);
  return await updateDoc(userRef, productParams);
};
