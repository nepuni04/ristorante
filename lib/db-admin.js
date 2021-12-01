import { compareDesc, parseISO } from "date-fns";
import { db } from "./firebase-admin";

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } 
  catch (error) {
    console.error(error)
    return { error };
  }
}

export async function getAllSites(uid) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .get()
  const sites = []

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  sites.sort((a, b) => compareDesc(parseISO(a), parseISO(b)))

  return { sites }
}