import { db } from '@/firebase';
import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from 'firebase/firestore';

export const addOrder = async (data: any) => {
  const commentDocument = await addDoc(collection(db, 'orders'), {
    phone: data.phone,
    email: data.email,
    address: data.address,
    fullName: data.fullName,
    owner: data.owner,
    total: data.total,
    status: data.status,
    payment: data.payment,
    products: data.products,
    createdAt: Timestamp.now(),
    deleted: false,
  });
  return commentDocument;
};
