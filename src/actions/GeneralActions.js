import {
  submitFeedback as submitFirestoreFeedback
} from '../firestore/GeneralClient'

export function submitFeedback(firestore, feedback, callback = () => {}) {
  submitFirestoreFeedback(firestore, feedback, callback)
}
