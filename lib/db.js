import firebaseApp from './firebase'
import { getFirestore, setDoc, updateDoc, addDoc, doc, collection } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export function updateUser(uid, data) {
	const userRef = doc(db, 'users', uid)
  return updateDoc(userRef, data)
}

export function createUser(uid, data) {
	const userRef = doc(db, 'users', uid)
  return setDoc(
		userRef, 
		{ ...data },
		{ merge: true }
	)
}

export function createFeedback(data) {
  return addDoc(collection(db, "feedback"), data)
}