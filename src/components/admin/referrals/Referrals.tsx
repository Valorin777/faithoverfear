import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { getReferralData } from './getReferralData'
import ReferralsView from './ReferralsView'

/**
 * Кастомная страница админки «Реферальная программа» (/admin/referrals).
 * Оборачивается в DefaultTemplate, чтобы вокруг был штатный каркас админки
 * (боковое меню, шапка). Серверный компонент: читает реальные данные
 * покупателей и отдаёт их в премиальный клиентский интерфейс.
 */
export default async function Referrals(props: AdminViewServerProps) {
  const { initPageResult, params, searchParams } = props
  const { req, permissions, visibleEntities, locale } = initPageResult
  const data = await getReferralData(req.payload)

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user ?? undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter className="fof-gutter">
        <ReferralsView data={data} />
      </Gutter>
    </DefaultTemplate>
  )
}
