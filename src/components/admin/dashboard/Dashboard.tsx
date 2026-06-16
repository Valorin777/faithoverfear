import { getPayload } from 'payload'
import config from '@payload-config'
import type { AdminViewServerProps } from 'payload'
import { Gutter } from '@payloadcms/ui'
import { getDashboardData } from './getDashboardData'
import DashboardView from './DashboardView'

/**
 * Кастомный дашборд админки Faith over Fear (views.dashboard).
 * Серверный компонент: тянет реальные метрики из базы и отдаёт
 * их в анимированный клиентский интерфейс. CRUD-разделы (/admin/collections/*)
 * остаются нетронутыми.
 */
export default async function Dashboard(props: AdminViewServerProps) {
  const payload = props?.initPageResult?.req?.payload ?? (await getPayload({ config }))
  const data = await getDashboardData(payload)

  const user = props?.user as { name?: string; email?: string } | undefined
  const userName = user?.name || user?.email?.split('@')[0] || ''
  const dateLabel = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <Gutter className="fof-gutter">
      <DashboardView data={data} userName={userName} dateLabel={dateLabel} />
    </Gutter>
  )
}
