export default function Faq({ items, heading }: { items: { q: string; a: string }[]; heading: string }) {
  if (!items?.length) return null;
  return (
    <section>
      <h2 id="faq">{heading}</h2>
      {items.map((item, i) => (
        <details className="faq-item" key={i}>
          <summary>{item.q}</summary>
          <div className="faq-answer">{item.a}</div>
        </details>
      ))}
    </section>
  );
}
