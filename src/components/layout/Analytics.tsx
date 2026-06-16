// Яндекс.Метрика и Google Analytics 4.
// Активируются автоматически, когда заданы переменные окружения:
//   NEXT_PUBLIC_YM_ID  — номер счётчика Яндекс.Метрики
//   NEXT_PUBLIC_GA_ID  — Measurement ID Google Analytics 4 (G-XXXX)

const YM_ID = process.env.NEXT_PUBLIC_YM_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function Analytics() {
  if (process.env.NODE_ENV !== 'production') return null
  if (!YM_ID && !GA_ID) return null

  return (
    <>
      {YM_ID && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${Number(YM_ID)}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
              `,
            }}
          />
          <noscript>
            <div>
              <img src={`https://mc.yandex.ru/watch/${Number(YM_ID)}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
            </div>
          </noscript>
        </>
      )}

      {GA_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(GA_ID)});
              `,
            }}
          />
        </>
      )}
    </>
  )
}
