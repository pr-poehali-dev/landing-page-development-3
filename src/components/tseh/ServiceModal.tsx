import { useEffect, useState } from 'react';
import { Service, CAT_LABEL, money, URGENT_MULT } from '@/data/tseh';
import { IconCheck, IconClock, IconBolt, IconClose } from './icons';

type Props = {
  service: Service;
  inCart: boolean;
  onClose: () => void;
  onAdd: (addonIds: string[], urgent: boolean) => void;
};

const ServiceModal = ({ service: s, inCart, onClose, onAdd }: Props) => {
  const [addons, setAddons] = useState<string[]>([]);
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const toggleAddon = (id: string) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const addSum = addons.reduce((sum, aid) => {
    const a = s.addons.find((x) => x.id === aid);
    return sum + (a ? a.price : 0);
  }, 0);
  const base = s.price + addSum;
  const total = urgent ? Math.round(base * URGENT_MULT) : base;

  return (
    <div className="tseh-overlay tseh">
      <button className="overlay-bg" onClick={onClose} aria-label="Закрыть" />
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Закрыть окно"><IconClose /></button>

        <div className="m-left">
          <div className="m-top">
            <span className="svc-num">{s.num}</span>
            <span className="svc-cat">{CAT_LABEL[s.cat]}</span>
          </div>
          <h3 className="m-title">{s.title}</h3>
          <p className="m-short">{s.short}</p>
          <h4 className="m-h">Что входит в цену</h4>
          <ul className="m-inc">
            {s.includes.map((x) => <li key={x}><IconCheck />{x}</li>)}
          </ul>
          {s.addons.length > 0 && (
            <>
              <h4 className="m-h">Опции — по желанию</h4>
              <div>
                {s.addons.map((a) => {
                  const on = addons.includes(a.id);
                  return (
                    <button key={a.id} className={'opt' + (on ? ' on' : '')} onClick={() => toggleAddon(a.id)}>
                      <span className="opt-left">
                        <span className="opt-box">{on && <IconCheck size={12} />}</span>
                        <span>{a.label}</span>
                      </span>
                      <span className="opt-price">+{money(a.price)}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="m-right">
          <p className="m-h" style={{ marginTop: 0 }}>Сумма по наряду</p>
          <div>
            <div className="m-sumrow"><span>Услуга «{s.title}»</span><span>{money(s.price)}</span></div>
            {addons.map((aid) => {
              const a = s.addons.find((x) => x.id === aid);
              if (!a) return null;
              return <div className="m-sumrow" key={aid}><span>{a.label}</span><span>+{money(a.price)}</span></div>;
            })}
            {urgent && (
              <div className="m-sumrow hot"><span>Срочный слот ×1.5</span><span>+{money(base * (URGENT_MULT - 1))}</span></div>
            )}
          </div>

          <div className="m-total">
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--mutdark)' }}>Итого</span>
            <span className="m-total-sum">{money(total)}</span>
          </div>

          <div className="m-days">
            <IconClock />
            {urgent ? `≈ ${Math.max(2, Math.ceil(s.days * 0.6))} дней — вне очереди` : s.daysLabel}
          </div>

          {s.days > 0 && (
            <>
              <button className={'urgent-btn' + (urgent ? ' on' : '')} onClick={() => setUrgent((v) => !v)}>
                <span className="urgent-left"><IconBolt />Срочно, вне очереди</span>
                <span className="switch"><i /></span>
              </button>
              <p className="urgent-note">×1.5 к цене, старт вне очереди</p>
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {inCart ? (
              <div className="in-cart-note"><IconCheck size={17} />Уже в заявке</div>
            ) : (
              <button className="btn btn-signal" onClick={() => onAdd(addons, urgent)}>
                В заявку · {money(total)}
              </button>
            )}
          </div>

          <p className="m-note">Цена и срок фиксируются в договоре. Предоплата 50%, остаток — после приёмки.</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
