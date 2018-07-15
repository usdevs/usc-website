export function submitFeedback(firestore, feedback, callback) {
  firestore
  .add({ collection: 'feedback' }, feedback)
  .then((snapshot) => callback(snapshot))
}
