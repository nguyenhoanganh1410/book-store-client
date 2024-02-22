import { MESSAGE_UNKNOWN_ERROR } from '@/constants';
import { deleteProductInCart, updateProductInCart } from '@/queries/cart';
import { toastError } from '@/utils';
import { ICartProduceDetail, IProduct } from '@/utils/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useCardItem = (product: ICartProduceDetail) => {
  const [currentQuality, setCurrentQuality] = useState(product.quality);
  const [loading, setLoading] = useState(false);

  const handleClickMinus = useCallback(async () => {
    if (currentQuality === 1) return;
    try {
      setLoading(true);
      await updateProductInCart(product.id, { quality: currentQuality - 1 });
    } catch (error) {
      toastError(MESSAGE_UNKNOWN_ERROR);
    } finally {
      setLoading(false);
    }
  }, [product, currentQuality]);

  const handleClickPluss = useCallback(async () => {
    try {
      setLoading(true);
      await updateProductInCart(product.id, { quality: currentQuality + 1 });
    } catch (error) {
      toastError(MESSAGE_UNKNOWN_ERROR);
    } finally {
      setLoading(false);
    }
  }, [product, currentQuality]);

  const handleClickDelete = useCallback(async () => {
    try {
        setLoading(true);
        await deleteProductInCart(product.id);
      } catch (error) {
        toastError(MESSAGE_UNKNOWN_ERROR);
      } finally {
        setLoading(false);
      }
  }, [product]);

  useEffect(() => {
    setCurrentQuality(product.quality);
  }, [product]);

  return {
    loading,
    currentQuality,
    handleClickDelete,
    handleClickMinus,
    handleClickPluss,
  };
};
