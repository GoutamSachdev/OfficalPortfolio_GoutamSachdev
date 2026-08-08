import { Html, Head, Main, NextScript } from 'next/document'

// Runs before paint so the correct theme class is on <html> from the first
// frame — no light→dark flash. Mirrors useSwitcherTheme's resolution order:
// explicit localStorage preference, then OS preference.
const themeScript = `
(function () {
  try {
    var pref = window.localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = pref ? pref === 'dark' : prefersDark;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}