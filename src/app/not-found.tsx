import Link from 'next/link';
import '../app/globals.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="wrap narrow" style={{ paddingTop: 80 }}>
          <h1>404</h1>
          <p>This page does not exist. 此頁面不存在。このページは存在しません。Esta página no existe.</p>
          <p>
            <Link href="/zh">繁體中文</Link> · <Link href="/en">English</Link> ·{' '}
            <Link href="/ja">日本語</Link> · <Link href="/es">Español</Link>
          </p>
        </div>
      </body>
    </html>
  );
}
