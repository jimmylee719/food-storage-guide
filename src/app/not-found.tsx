import Link from 'next/link';
import '../app/globals.css';

/**
 * The 404 is served outside a locale segment, so it cannot know which language
 * the reader wants and says it in both published ones. It previously also
 * offered Japanese and Spanish, which sent a reader who had already hit a dead
 * end to two more.
 */
export default function NotFound() {
  return (
    <html lang="zh-Hant-TW">
      <body>
        <div className="wrap narrow" style={{ paddingTop: 80 }}>
          <h1>404</h1>
          <p>此頁面不存在。This page does not exist.</p>
          <p>
            <Link href="/zh">繁體中文</Link> · <Link href="/en">English</Link>
          </p>
        </div>
      </body>
    </html>
  );
}
