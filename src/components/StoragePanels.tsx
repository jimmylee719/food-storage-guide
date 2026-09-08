import { type Locale, t } from '@/lib/i18n';
import { METHOD_KEYS, formatSpan, methodRows, primarySpan, type MethodKey } from '@/lib/data';
import type { Food } from '@/lib/types';

const ICONS: Record<MethodKey, string> = { pantry: '🗄', fridge: '🧊', freezer: '❄' };

export default function StoragePanels({ food, locale }: { food: Food; locale: Locale }) {
  const d = t(locale);
  const labels: Record<MethodKey, string> = { pantry: d.pantryLong, fridge: d.fridgeLong, freezer: d.freezerLong };

  return (
    <div className="storage-grid">
      {METHOD_KEYS.map((key) => {
        const method = food.storage[key];
        const rows = methodRows(method, locale);
        const main = formatSpan(primarySpan(method), locale);
        const tip = rows.find((r) => r.tips)?.tips ?? null;
        return (
          <section key={key} className={`storage-panel ${key}`}>
            <h3 className="storage-head">
              <span aria-hidden="true">{ICONS[key]}</span> {labels[key]}
            </h3>
            <div className="storage-body">
              {main ? <p className="storage-value">{main}</p> : null}
              {!main && !tip ? <p className="storage-none">{d.noData}</p> : null}
              {rows.length > 1 || (rows.length === 1 && !main) ? (
                <dl style={{ margin: main ? '10px 0 0' : 0 }}>
                  {rows.map((r) => (
                    <div className="storage-row" key={r.key}>
                      <dt>{r.label}</dt>
                      <dd>{r.value ?? '—'}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {tip ? <p className="storage-tip">{tip}</p> : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
