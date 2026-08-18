import { useState, useEffect, useCallback } from 'react';
import '@/styles/tseh.css';
import { Service } from '@/data/tseh';
import { useCart } from '@/components/tseh/useCart';
import Header from '@/components/tseh/Header';
import Hero from '@/components/tseh/Hero';
import Catalog from '@/components/tseh/Catalog';
import ServiceModal from '@/components/tseh/ServiceModal';
import CartDrawer from '@/components/tseh/CartDrawer';
import { Stats, Process, Cases, Reviews, Faq, Cta, Footer } from '@/components/tseh/Sections';

const Index = () => {
  const { cart, add, remove, clear, total } = useCart();
  const [modalService, setModalService] = useState<Service | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [presetComment, setPresetComment] = useState('');

  const cartIds = cart.map((c) => c.serviceId);

  useEffect(() => {
    const locked = modalService || drawerOpen;
    document.documentElement.classList.toggle('tseh-lock', !!locked);
    return () => document.documentElement.classList.remove('tseh-lock');
  }, [modalService, drawerOpen]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('.tseh .reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const addAndOpen = useCallback((id: string, addonIds: string[], urgent: boolean) => {
    add(id, addonIds, urgent);
    setModalService(null);
    setDrawerOpen(true);
  }, [add]);

  const customTask = () => {
    setPresetComment('Нужна задача, которой нет в прейскуранте: ');
    setDrawerOpen(true);
  };

  return (
    <div className="tseh">
      <div className="tseh-noise" aria-hidden="true" />
      <Header count={cart.length} onOpenCart={() => setDrawerOpen(true)} />
      <Hero count={cart.length} onOpenCart={() => setDrawerOpen(true)} />
      <Stats />
      <Catalog
        cartIds={cartIds}
        onOpen={(s) => setModalService(s)}
        onQuickAdd={(id) => addAndOpen(id, [], false)}
        onCustomTask={customTask}
      />
      <Process />
      <Cases />
      <Reviews />
      <Faq />
      <Cta onOpenCart={() => setDrawerOpen(true)} />
      <Footer />

      {modalService && (
        <ServiceModal
          service={modalService}
          inCart={cartIds.includes(modalService.id)}
          onClose={() => setModalService(null)}
          onAdd={(addonIds, urgent) => addAndOpen(modalService.id, addonIds, urgent)}
        />
      )}

      {drawerOpen && (
        <CartDrawer
          cart={cart}
          total={total}
          presetComment={presetComment}
          onClose={() => { setDrawerOpen(false); setPresetComment(''); }}
          onRemove={remove}
          onClear={clear}
        />
      )}
    </div>
  );
};

export default Index;
