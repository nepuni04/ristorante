import { getAllSites } from '@/lib/db-admin'
import { auth } from '@/lib/firebase-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { sites } = await getAllSites(uid)

    res.status(200).json({ sites })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }  
}