import { useEffect, useState } from 'react';
import { money, svcById } from '@/data/tseh';
import { CartItem, itemPrice } from './useCart';
import { IconClose, IconTrash, IconBolt, IconClipboard, IconCheck } from './icons';

type Props = {
  cart: CartItem[];
  total: number;
  presetComment?: string;
  onClose: () => void;
  onRemove: (uid: string) => void;
  onClear: () => void;
};

const CartDrawer = ({ cart, total, presetComment, onClose, onRemove, onClear }: Props) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [deadline, setDeadline] = useState('Как можно скорее');
  const [comment, setComment] = useState(presetComment || '');
  const [errName, setErrName] = useState('');
  const [errContact, setErrContact] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => { if (presetComment) setComment(presetComment); }, [presetComment]);

  const submit = () => {
    let ok = true;
    if (name.trim().length < 2) { setErrName('Как к вам обращаться?'); ok = false; } else setErrName('');
    if (contact.trim().length < 5) { setErrContact('Нужен телеграм или телефон, чтобы прислать смету'); ok = false; } else setErrContact('');
    if (!ok) return;
    setSubmitted('ЦХ-26-' + (1000 + Math.floor(Math.random() * 9000)));
  };

  const body = () => {
    if (submitted) {
      return (
        <div className="done">
          <span className="done-mark"><IconCheck size={38} /></span>
          <h3>Заявка принята</h3>
          <p className="done-num">№ {submitted}</p>
          <p>Менеджер свяжется в течение рабочего часа (пн–пт, 10:00–19:00 мск), подтвердит состав работ и пришлёт договор. Цена зафиксирована.</p>
          <div className="done-actions">
            <button className="btn btn-ink" onClick={() => { onClear(); onClose(); }}>Вернуться на сайт</button>
            <a className="btn btn-ghost" href="https://t.me/neuro_tseh" target="_blank" rel="noreferrer">Написать в телеграм</a>
          </div>
        </div>
      );
    }

    if (cart.length === 0) {
      return (
        <div className="empty">
          <span className="empty-icon"><IconClipboard size={40} /></span>
          <h3>Пока пусто</h3>
          <p>Добавьте услуги из прейскуранта — цена, срок и наценки посчитаются сами.</p>
          <a className="btn btn-ink" href="#catalog" onClick={onClose}>К прейскуранту</a>
        </div>
      );
    }

    return (
      <>
        {cart.map((it) => {
          const s = svcById(it.serviceId);
          if (!s) return null;
          return (
            <div className="item" key={it.uid}>
              <button className="item-del" onClick={() => onRemove(it.uid)} aria-label={`Убрать «${s.title}»`}><IconTrash /></button>
              <p className="item-title">{s.title}</p>
              {it.addonIds.length > 0 && (
                <ul className="item-addons">
                  {it.addonIds.map((aid) => {
                    const a = s.addons.find((x) => x.id === aid);
                    return a ? <li key={aid}>+ {a.label} · {money(a.price)}</li> : null;
                  })}
                </ul>
              )}
              <div className="item-foot">
                {it.urgent
                  ? <span className="urgent-chip"><IconBolt size={11} />срочно</span>
                  : <span className="item-days">{s.daysLabel}</span>}
                <span className="item-price">{money(itemPrice(it))}</span>
              </div>
            </div>
          );
        })}

        <div className="total-box">
          <div className="total-row">
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--mutdark)' }}>Итого по наряду</span>
            <b>{money(total)}</b>
          </div>
          <p className="total-prepay">Предоплата 50% — {money(total / 2)} после договора</p>
        </div>

        <p className="form-h">Куда прислать смету и договор</p>
        <div className="field">
          <input className={'inp' + (errName ? ' err' : '')} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" />
          {errName && <p className="f-err">{errName}</p>}
        </div>
        <div className="field">
          <input className={'inp' + (errContact ? ' err' : '')} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="@telegram или телефон" />
          {errContact && <p className="f-err">{errContact}</p>}
        </div>
        <div className="field">
          <select className="inp" value={deadline} onChange={(e) => setDeadline(e.target.value)}>
            <option>Как можно скорее</option>
            <option>В течение месяца</option>
            <option>Планирую заранее</option>
          </select>
        </div>
        <div className="field">
          <textarea className="inp" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Пара слов о задаче (необязательно)" />
        </div>
        <button className="btn btn-signal" style={{ width: '100%' }} onClick={submit}>Отправить в цех</button>
        <p className="form-note">Без спама и «прогрева»: один ответ по делу в течение рабочего часа.</p>
      </>
    );
  };

  return (
    <>
      <button className="tseh-drawer-bg" onClick={onClose} aria-label="Закрыть" />
      <aside className="tseh-drawer tseh" role="dialog" aria-modal="true" aria-label="Наряд-заказ">
        <div className="drawer-head">
          <p className="drawer-title">
            Наряд-заказ
            {cart.length > 0 && <span className="badge">{cart.length}</span>}
          </p>
          <button className="drawer-close" onClick={onClose} aria-label="Закрыть заявку"><IconClose size={15} /></button>
        </div>
        <div className="drawer-body">{body()}</div>
      </aside>
    </>
  );
};

export default CartDrawer;
