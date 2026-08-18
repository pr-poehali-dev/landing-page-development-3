import { useState, useEffect, useCallback } from 'react';
import { URGENT_MULT, svcById } from '@/data/tseh';

export type CartItem = {
  uid: string;
  serviceId: string;
  addonIds: string[];
  urgent: boolean;
};

const KEY = 'tseh-cart-v1';

const load = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((it: CartItem) => !!svcById(it.serviceId));
  } catch {
    return [];
  }
};

export const itemPrice = (it: CartItem) => {
  const s = svcById(it.serviceId);
  if (!s) return 0;
  let sum = s.price;
  it.addonIds.forEach((aid) => {
    const a = s.addons.find((x) => x.id === aid);
    if (a) sum += a.price;
  });
  if (it.urgent) sum = Math.round(sum * URGENT_MULT);
  return sum;
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const add = useCallback((serviceId: string, addonIds: string[], urgent: boolean) => {
    setCart((prev) => {
      if (prev.some((c) => c.serviceId === serviceId)) return prev;
      return [...prev, { uid: Date.now() + '-' + Math.random().toString(36).slice(2, 7), serviceId, addonIds, urgent }];
    });
  }, []);

  const remove = useCallback((uid: string) => {
    setCart((prev) => prev.filter((c) => c.uid !== uid));
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const total = cart.reduce((sum, it) => sum + itemPrice(it), 0);

  return { cart, add, remove, clear, total };
};
