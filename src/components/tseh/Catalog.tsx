import { useState } from 'react';
import { SERVICES, CATS, CAT_LABEL, priceLabel, Service } from '@/data/tseh';
import { IconClock, IconPlus, IconCheck, IconSpark } from './icons';

type Props = {
  cartIds: string[];
  onOpen: (s: Service) => void;
  onQuickAdd: (id: string) => void;
  onCustomTask: () => void;
};

const Catalog = ({ cartIds, onOpen, onQuickAdd, onCustomTask }: Props) => {
  const [filter, setFilter] = useState('all');
  const list = SERVICES.filter((s) => filter === 'all' || s.cat === filter);

  return (
    <section className="sec" id="catalog">
      <div className="wrap">
        <div className="sec-head">
          <div className="reveal">
            <p className="sec-label">01 / Прейскурант</p>
            <h2 className="sec-title">Выбирайте<br />как с витрины</h2>
          </div>
          <p className="reveal" style={{ maxWidth: 380, fontSize: 15, lineHeight: 1.55, color: 'var(--muted)' }}>
            Цена зафиксирована, срок — в договоре. Нажмите на строку, чтобы раскрыть состав работ, или «+» — чтобы сразу положить в заявку.
          </p>
        </div>

        <div className="filters">
          {CATS.map(([id, label]) => (
            <button key={id} className={'chip' + (id === filter ? ' on' : '')} onClick={() => setFilter(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className="svc-list">
          {list.map((s) => {
            const inCart = cartIds.includes(s.id);
            return (
              <div className="svc-row" key={s.id} onClick={() => onOpen(s)}>
                {s.popular && <span className="pop-tag">хит цеха</span>}
                <span className="svc-num">{s.num}</span>
                <div className="svc-main">
                  <h3 className="svc-title">{s.title}</h3>
                  <span className="svc-cat">{CAT_LABEL[s.cat]}</span>
                  <p className="svc-short">{s.short}</p>
                </div>
                <div className="svc-side">
                  <span className="svc-days"><IconClock />{s.daysLabel}</span>
                  <span className="svc-price">{priceLabel(s)}</span>
                  <button
                    className={'add-btn' + (inCart ? ' in-cart' : '')}
                    onClick={(e) => { e.stopPropagation(); onQuickAdd(s.id); }}
                    aria-label={`Добавить «${s.title}» в заявку`}
                    title={inCart ? 'Уже в заявке' : 'Быстро в заявку'}
                  >
                    {inCart ? <IconCheck /> : <IconPlus />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="custom-note reveal">
          <IconSpark />
          <p><b>Нужно что-то не из списка?</b> Опишите задачу — за 1 рабочий день соберём смету в том же формате: цена, срок, состав.</p>
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={onCustomTask}>Описать задачу</button>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
