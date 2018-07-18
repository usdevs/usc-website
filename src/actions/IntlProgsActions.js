import {
  createIntlProg as createFirestoreIntlProg
} from '../../firestore/IntlProgsClient'
import { uploadFile } from './FilesActions'
import { config } from '../../resources/config'

export function createIntlProg(firestore, firebase, intlProg, callback => () => {}) {
  createFirestoreIntlProg(firestore, intlProg, (snapshot) => {
    const id = snapshot.id
  })
}
