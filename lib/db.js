import firebaseApp from './firebase'
import { getFirestore, setDoc, updateDoc, addDoc, deleteDoc, doc, collection } from "firebase/firestore"

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

export function updateFeedback(id, data) {
	const feedbackRef = doc(db, "feedback", id);
	return updateDoc(feedbackRef, data)
}

export function deleteFeedback(id) {
	const feedbackRef = doc(db, 'feedback', id)
	return deleteDoc(feedbackRef)
}

export function createSite(data) {
	return addDoc(collection(db, 'sites'), data)
}

export function deleteSite(id) {
	const siteRef = doc(db, 'sites', id)
	return deleteDoc(siteRef)
}
