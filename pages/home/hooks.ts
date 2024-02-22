import { ICategory } from '@/utils/interfaces';
import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { Tables } from '@/utils/enums';
import { getProductsByCategoryId } from '@/queries/products';

const useHomeHooks = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [dataProducts, setDataProducts] = useState<any>([]);

  const getCategories = useCallback(() => {
    try {
      const q = query(
        collection(db, Tables.categories),
        where('deleted', '==', false),
        orderBy('createdAt', 'desc')
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ICategory[];
        setCategories(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getDataProducts = useCallback(async () => {
    const promises = categories.map((value) =>
      getProductsByCategoryId(value.id)
    );
    const data = await Promise.all(promises);
    setDataProducts(data);
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0) getDataProducts();
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, dataProducts };
};

export default useHomeHooks;
