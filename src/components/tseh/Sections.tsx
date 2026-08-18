import { useEffect, useRef, useState } from 'react';
import { STEPS, CASES, REVIEWS, FAQS } from '@/data/tseh';
import { IconArrow, IconClock, IconTelegram, IconStar, IconBolt, IconShield, IconMail, IconPhone } from './icons';

const useCounter = (target: number, dec = 0) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(el);
        if (prm) { el.textContent = dec ? target.toFixed(dec).replace('.', ',') : String(target); return; }
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1500);
          const e = 1 - Math.pow(1 - p, 3);
          const v = target * e;
          el.textContent = dec ? v.toFixed(dec).replace('.', ',') : String(Math.round(v));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: .4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, dec]);
  return ref;
};

export const Stats = () => {
  const c1 = useCounter(214);
  const c2 = useCounter(9);
  const c3 = useCounter(96);
  const c4 = useCounter(4.9, 1);
  return (
    <section className="stats bg-grid-dark">
      <div className="wrap">
        <p className="stats-meta"><span className="dot blink" />цех в цифрах — обновлено 12.01.2026</p>
        <div className="stats-grid">
          <div className="stat"><div className="stat-v"><span ref={c1}>0</span></div><div className="stat-l">проектов сдано с 2017 года</div></div>
          <div className="stat"><div className="stat-v"><span ref={c2}>0</span><small> лет</small></div><div className="stat-l">цеху — не стартап-однодневка</div></div>
          <div className="stat"><div className="stat-v"><span ref={c3}>0</span><small>%</small></div><div className="stat-l">клиентов возвращаются со второй задачей</div></div>
          <div className="stat"><div className="stat-v accent"><span ref={c4}>0</span><small>/5</small></div><div className="stat-l">средняя оценка по 180 отзывам</div></div>
        </div>
      </div>
    </section>
  );
};

export const Process = () => (
  <section className="sec" id="process" style={{ borderTop: '1px solid rgba(16,35,61,.15)' }}>
    <div className="wrap process-grid">
      <div className="proc-sticky">
        <div className="reveal">
          <p className="sec-label">02 / Процесс</p>
          <h2 className="sec-title">Как идёт<br />работа</h2>
          <p className="proc-lead">Никаких «погружений на две недели». Пять этапов, у каждого — срок и артефакт: договор, демо, акт. Вы всегда знаете, что происходит с задачей и почему.</p>
        </div>
        <div className="proc-card reveal">
          <img className="proc-avatar" src="/neira.png" alt="Нейра" />
          <div>
            <p>Нейра — куратор цеха</p>
            <p>ведёт проект от заявки до приёмки, на связи в телеграме</p>
          </div>
          <a className="proc-tg" href="https://t.me/neuro_tseh" target="_blank" rel="noreferrer" aria-label="Телеграм продюсера"><IconTelegram /></a>
        </div>
      </div>
      <div className="steps">
        {STEPS.map((st) => (
          <article className="step reveal" key={st.num}>
            <span className="step-num">{st.num}</span>
            <div>
              <div className="step-title">
                {st.title}
                <span className="step-time"><IconClock size={13} />{st.time}</span>
              </div>
              <p>{st.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const Cases = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };
  return (
    <section className="cases" id="cases">
      <div className="wrap sec" style={{ paddingBottom: 0 }}>
        <div className="sec-head" style={{ marginBottom: 32 }}>
          <div className="reveal">
            <p className="sec-label">03 / Кейсы</p>
            <h2 className="sec-title">Что уже<br />со станка</h2>
          </div>
          <div className="arrows reveal">
            <button className="arrow" onClick={() => scroll(-1)} aria-label="Назад">
              <span style={{ transform: 'rotate(180deg)', display: 'grid' }}><IconArrow /></span>
            </button>
            <button className="arrow" onClick={() => scroll(1)} aria-label="Вперёд"><IconArrow /></button>
          </div>
        </div>
      </div>
      <div className="cases-track" ref={trackRef}>
        {CASES.map((c) => (
          <article className="case reveal" key={c.title}>
            <div className="case-img">
              <img src={c.img} alt={c.title} loading="lazy" />
              <span className="case-tag">{c.tag}</span>
            </div>
            <div className="case-body">
              <h3>{c.title}</h3>
              <p className="case-note">{c.note}</p>
              <span className="case-res">{c.res}</span>
            </div>
          </article>
        ))}
        <a className="case-link reveal" href="#catalog">
          <h3>Следующий кейс — <span>ваш?</span></h3>
          <span className="go">Выбрать услугу <IconArrow size={17} /></span>
        </a>
      </div>
    </section>
  );
};

export const Reviews = () => (
  <section className="reviews sec" id="reviews">
    <div className="wm2" aria-hidden="true">ОТЗЫВЫ</div>
    <div className="wrap" style={{ position: 'relative' }}>
      <div className="sec-head">
        <div className="reveal">
          <p className="sec-label">04 / Отзывы</p>
          <h2 className="sec-title">Что говорят<br />заказчики</h2>
        </div>
        <p className="reveal" style={{ maxWidth: 380, borderLeft: '2px solid var(--signal)', paddingLeft: 16, fontSize: 14, lineHeight: 1.55, fontWeight: 600, color: 'var(--mutdark)' }}>
          180+ отзывов за 9 лет, средняя оценка 4.9. Ниже — пять свежих, без купюр и «работаем с этой командой 100500 лет».
        </p>
      </div>
      <div className="rev-grid">
        {REVIEWS.map((r) => (
          <figure className="rev reveal" key={r.name} style={{ transform: `rotate(${r.rot})` }}>
            <div className="stars">
              {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} off={i >= r.stars} />)}
            </div>
            <blockquote>{r.text}</blockquote>
            <figcaption>
              <p className="rev-name">{r.name}</p>
              <p className="rev-role">{r.role}</p>
              <span className="rev-svc">{r.svc}</span>
            </figcaption>
          </figure>
        ))}
        <a className="rev-tg reveal" href="https://t.me/neuro_tseh" target="_blank" rel="noreferrer">
          <div>
            <p className="big">4.9<small>/5</small></p>
            <p>Остальные отзывы — в закрепе телеграм-канала, вместе с факапами и выводами. Честнее не найдёте.</p>
          </div>
          <span className="go"><IconTelegram />@neuro_tseh<i /></span>
        </a>
      </div>
    </div>
  </section>
);

export const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec" id="faq" style={{ borderTop: '1px solid rgba(16,35,61,.15)' }}>
      <div className="wrap faq-grid">
        <div className="faq-side">
          <div className="reveal">
            <p className="sec-label">05 / Вопросы</p>
            <h2 className="sec-title">Спрашивают<br />до оплаты</h2>
            <p className="faq-lead">Семь вопросов, которые задают чаще всего — от «почему фикс-прайс» до законности нейрофото. Остальное — в телеграме: отвечаем быстрее, чем сохнет краска на вывеске.</p>
          </div>
          <a className="btn btn-ghost reveal" style={{ marginTop: 32 }} href="https://t.me/neuro_tseh" target="_blank" rel="noreferrer">
            <IconTelegram />Задать свой вопрос
          </a>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={'acc' + (open === i ? ' open' : '')} key={f.q}>
              <button className="acc-btn" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="acc-q">
                  <span className="acc-n">{String(i + 1).padStart(2, '0')}</span>{f.q}
                </span>
                <span className="acc-x">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4v16M4 12h16" /></svg>
                </span>
              </button>
              <div className="acc-body"><div><p>{f.a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Cta = ({ onOpenCart }: { onOpenCart: () => void }) => (
  <section className="cta">
    <div className="wrap cta-in">
      <div className="reveal">
        <p className="sec-label" style={{ color: 'rgba(16,35,61,.7)' }}>06 / Финал — он же начало</p>
        <h2>Есть задача?<br />Жмите.</h2>
        <div className="trust">
          <span><IconBolt size={15} />старт от 3 дней</span>
          <span><IconShield />гарантия 60 дней</span>
        </div>
      </div>
      <div className="cta-card reveal">
        <img className="cta-neira" src="/neira.png" alt="Нейра" />
        <p className="k">Наряд-заказ · 3 минуты</p>
        <p>Соберите корзину из прейскуранта — цена посчитается сама, а менеджер подтвердит смету в течение рабочего часа.</p>
        <button className="btn btn-signal" onClick={onOpenCart}>Собрать заявку <IconArrow size={17} /></button>
        <a className="tg-line" href="https://t.me/neuro_tseh" target="_blank" rel="noreferrer">
          <IconTelegram size={16} />или сразу в телеграм
        </a>
        <p className="small">Без предоплаты на этом шаге. Деньги — после договора.</p>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer>
    <div className="wrap">
      <a className="foot-word" href="#top" aria-label="Наверх">НЕЙРО ЦЕХ</a>
      <div className="foot-grid">
        <div>
          <p className="foot-h">Нейро цех — бюро цифровых услуг</p>
          <p className="foot-p">Продаём сайты, приложения, игры и медиа как товар: с ценником, сроком и гарантией. Штат 14 человек, без субподряда.</p>
        </div>
        <div>
          <p className="foot-h">Разделы</p>
          <ul>
            <li><a href="#catalog">Прейскурант</a></li>
            <li><a href="#process">Процесс</a></li>
            <li><a href="#cases">Кейсы</a></li>
            <li><a href="#reviews">Отзывы</a></li>
            <li><a href="#faq">Вопросы</a></li>
          </ul>
        </div>
        <div>
          <p className="foot-h">Контакты</p>
          <ul>
            <li><a href="https://t.me/neuro_tseh" target="_blank" rel="noreferrer"><IconTelegram size={15} />@neuro_tseh</a></li>
            <li><a href="mailto:zakaz@neuro-tseh.ru"><IconMail />zakaz@neuro-tseh.ru</a></li>
            <li><a href="tel:+74951204567"><IconPhone />+7 495 120-45-67</a></li>
          </ul>
        </div>
        <div>
          <p className="foot-h">Режим работы</p>
          <ul style={{ fontSize: 14, color: 'rgba(241,246,251,.8)' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 220 }}><span style={{ color: 'var(--mutdark)' }}>пн–пт</span><b>10:00–19:00 мск</b></li>
            <li style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 220 }}><span style={{ color: 'var(--mutdark)' }}>сб</span><b>дежурная смена</b></li>
            <li style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 220 }}><span style={{ color: 'var(--mutdark)' }}>вс</span><b>станки спят</b></li>
          </ul>
          <p className="foot-p" style={{ marginTop: 18, fontSize: 12 }}>
            ИП Кузнецов Г. П. · ИНН 771542930188<br />Договор, счёт, акт — за 1 рабочий день.
          </p>
        </div>
      </div>
      <div className="foot-meta">
        <p>© 2017–2026 НЕЙРО ЦЕХ · Прейскурант №7 действует с 12.01.2026</p>
        <p>Хакнули нейросети, а не шаблон <span className="sep">◆</span> Москва — весь мир</p>
      </div>
    </div>
  </footer>
);