import Link from 'next/link';
import { type Locale, t } from '@/lib/i18n';
import { headline } from '@/lib/data';
import type { Food } from '@/lib/types';

export default function FoodTable({ items, locale }: { items: Food[]; locale: Locale }) {
  const d = t(locale);
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th scope="col">{d.allFoods}</th>
            <th scope="col">{d.pantry}</th>
            <th scope="col">{d.fridge}</th>
            <th scope="col">{d.freezer}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((f) => (
            <tr key={f.slug} id={f.slug}>
              <th scope="row" style={{ background: 'transparent', whiteSpace: 'normal', fontWeight: 500, color: 'inherit' }}>
                {f.hasPage ? <Link href={`/${locale}/food/${f.slug}`}>{f.names[locale]}</Link> : f.names[locale]}
              </th>
              <td className="num">{headline(f, 'pantry', locale)}</td>
              <td className="num">{headline(f, 'fridge', locale)}</td>
              <td className="num">{headline(f, 'freezer', locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
