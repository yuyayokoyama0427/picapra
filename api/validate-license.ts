import type { VercelRequest, VercelResponse } from '@vercel/node'

const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY!
const STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { key } = req.body as { key?: string }
  if (!key || typeof key !== 'string') {
    return res.status(400).json({ valid: false })
  }

  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({ license_key: key }),
    })

    if (!response.ok) {
      return res.status(200).json({ valid: false })
    }

    const data = await response.json() as { valid: boolean; license_key?: { store_id?: number } }

    // ストアIDが一致するか確認
    const storeId = data.license_key?.store_id
    const valid = data.valid && String(storeId) === STORE_ID

    return res.status(200).json({ valid })
  } catch {
    return res.status(200).json({ valid: false })
  }
}
