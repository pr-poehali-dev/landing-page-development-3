import { useEffect, useState } from 'react';
import { IconClipboard } from './icons';

const NAV = [
  ['#catalog', 'Прейскурант'],
  ['#process', 'Процесс'],
  ['#cases', 'Кейсы'],
  ['#reviews', 'Отзывы'],
  ['#faq', 'Вопросы'],
];

const Header = ({ count, onOpenCart }: { count: number; onOpenCart: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'hdr' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap hdr-in">
        <a className="logo" href="#top">
          <img className="logo-mark" src="/logo-mark.png" alt="Нейро цех" />
          <span>
            <span className="logo-name">НЕЙРО ЦЕХ</span>
            <span className="logo-sub">хакни нейросети</span>
          </span>
        </a>
        <nav className="nav">
          {NAV.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="hdr-actions">
          <button className="cart-btn" onClick={onOpenCart} aria-label="Открыть заявку">
            <IconClipboard />
            <span>Заявка</span>
            <span className="badge">{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;