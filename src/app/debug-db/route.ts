import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

// ВРЕМЕННЫЙ диагностический маршрут — удалить после отладки.
export async function GET() {
  const env = {
    hasDATABASE_URI: !!process.env.DATABASE_URI,
    hasPOSTGRES_URL: !!process.env.POSTGRES_URL,
    hasPOSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
    hasPAYLOAD_SECRET: !!process.env.PAYLOAD_SECRET,
    hasBLOB: !!process.env.BLOB_READ_WRITE_TOKEN,
    dbPrefix: (
      process.env.DATABASE_URI ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.POSTGRES_URL ||
      'none'
    ).slice(0, 14),
    nodeEnv: process.env.NODE_ENV,
  }

  try {
    const payload = await getPayload({ config })
    const res = await payload.count({ collection: 'products' })
    return Response.json({ ok: true, productsCount: res.totalDocs, env })
  } catch (e) {
    const err = e as Error
    return Response.json({
      ok: false,
      error: String(err?.message || err),
      stack: String(err?.stack || '').split('\n').slice(0, 10),
      env,
    })
  }
}
