import type { StaticPage } from '@/lib/pages';

/**
 * Renders the sections of a StaticPage. Every static route uses this, so a new
 * section feature (bullet lists, say) only has to be added in one place.
 */
export default function StaticPageBody({ page }: { page: StaticPage }) {
  return (
    <div className="prose">
      {page.sections.map((s, i) => (
        <section key={i}>
          {s.heading ? <h2>{s.heading}</h2> : null}
          {s.body.map((p, j) => <p key={j}>{p}</p>)}
          {s.bullets?.length ? (
            <ul>
              {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
