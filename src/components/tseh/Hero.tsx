import { useEffect, useRef } from 'react';
import { SERVICES, priceLabel } from '@/data/tseh';
import { IconArrow, IconBolt, IconShield, IconDoc } from './icons';

const SC = '▓▒░<>/#%&@$*+=';

const useScramble = (delay: number) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const text = el.textContent || '';
    el.textContent = text.replace(/[^\s.,:!?—]/g, () => SC[Math.floor(Math.random() * SC.length)]);
    let interval: number;
    const timer = window.setTimeout(() => {
      let frame = 0;
      interval = window.setInterval(() => {
        frame++;
        const locked = Math.floor(frame / 2.4);
        let s = '';
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (/[\s.,:!?—]/.test(c)) { s += c; continue; }
          s += i < locked ? c : SC[Math.floor(Math.random() * SC.length)];
        }
        el.textContent = s;
        if (locked >= text.length) { el.textContent = text; clearInterval(interval); }
      }, 26);
    }, delay);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [delay]);
  return ref;
};

const BOARD_ROWS = [
  ['Услуг в прейскуранте', '11 позиций'],
  ['Ближайшее окно', 'через 3 дня'],
  ['Проектов в работе', '7 (смена №2)'],
  ['Гарантия на работы', '60 дней'],
  ['Средняя оценка', '4.9 / 5'],
];

const Hero = ({ count, onOpenCart }: { count: number; onOpenCart: () => void }) => {
  const r1 = useScramble(200);
  const r2 = useScramble(700);
  const r3 = useScramble(1200);
  const tickItems = SERVICES.map((s) => s.title + ' — ' + priceLabel(s));
  const seg = (
    <div className="ticker-seg">
      {tickItems.map((t, i) => <span className="ticker-item" key={i}>{t}</span>)}
    </div>
  );

  return (
    <section className="hero bg-grid" id="top">
      <div className="wm" aria-hidden="true">ЦЕХ</div>
      <div className="wrap hero-grid">
        <div>
          <p className="price-label"><span className="dot blink" />Прейскурант №7 · действует с 12.01.2026</p>
          <h1 className="h1">
            <span ref={r1}>Цена.</span><br />
            <span ref={r2}>Срок.</span><br />
            <span className="accent" ref={r3}>Результат.</span>
          </h1>
          <p className="hero-lead">
            Цех — бюро, где digital-услуги продаются <b>как товар на витрине</b>: сайты, приложения, игры,
            нейрофотосессии и промо-видео с фиксированной ценой, сроком в договоре и гарантией 60 дней.
            Собираете корзину — мы берём в работу.
          </p>
          <div className="hero-cta">
            <a className="btn btn-ink" href="#catalog">Смотреть прейскурант <IconArrow /></a>
            <button className="btn btn-ghost" onClick={onOpenCart}>
              Заявка · <span className="badge">{count}</span>
            </button>
          </div>
          <div className="trust">
            <span><IconBolt size={15} />срочный слот ×1.5</span>
            <span><IconShield />гарантия 60 дней</span>
            <span><IconDoc />договор и закрывающие</span>
          </div>
        </div>

        <div className="board-wrap">
          <div className="board">
            <svg className="stamp" viewBox="0 0 100 100" aria-hidden="true">
              <defs><path id="sc" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" fill="none" /></defs>
              <circle cx="50" cy="50" r="48" fill="#FF4D00" stroke="#15161A" strokeWidth="2" />
              <circle cx="50" cy="50" r="24" fill="none" stroke="#15161A" strokeWidth="1.2" strokeDasharray="3 3" />
              <text fill="#15161A" fontSize="8.6" fontWeight="700" letterSpacing="1.5">
                <textPath href="#sc">ФИКС-ПРАЙС · СРОК В ДОГОВОРЕ ·</textPath>
              </text>
              <text x="50" y="59" textAnchor="middle" fontSize="26" fontWeight="900" fill="#15161A">₽</text>
            </svg>
            <div className="board-head">
              Наряд-заказ · ЦЕХ
              <span className="board-live"><i className="blink" />цех на смене</span>
            </div>
            <dl>
              {BOARD_ROWS.map(([dt, dd]) => (
                <div className="board-row" key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
              ))}
            </dl>
            <div className="board-foot">
              * цены в прейскуранте окончательные. доплаты «по ходу» — только если вы сами меняете состав работ.
            </div>
          </div>
        </div>
      </div>
      <div className="ticker"><div className="ticker-track">{seg}{seg}</div></div>
    </section>
  );
};

export default Hero;
