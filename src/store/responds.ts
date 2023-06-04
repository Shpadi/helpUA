import { storage, db } from '@/firebase'
import { setDoc, doc, collection, getDocs, getDoc, updateDoc } from "firebase/firestore"
import { v4 as uuidv4, v4 } from 'uuid'


const respondsCollections = collection(db, 'responds')

const state = {
    userResponds: []
}

const actions = {
    async fetchUserResponds({ rootState, commit }: any) {
        const user = rootState.auth.currentUser
        const respondsRef = doc(respondsCollections, user.uuid)
        const respondsSnap = await getDoc(respondsRef)
        if (respondsSnap.exists()) {
            const respondArray = respondsSnap.data().responds
            commit('setResponds', respondArray)
        }
        
    },
    async createRespond(_: any, respond: any) {
        const respondsRef = doc(respondsCollections, respond.item.owner_id)
        const respondsSnap = await getDoc(respondsRef)
        const respondsProfile = {
            responds: [
                {
                    respond,
                    uuid: v4()
                }
            ]
        }
        if (respondsSnap.exists()) {
            const respondArray = respondsSnap.data().responds
            respondArray.push({
                respond,
                uuid: v4()
            })
            console.log('respondArray', respondArray)
            return updateDoc(respondsRef, { responds: respondArray })
        } else {
            await setDoc(doc(respondsCollections, respond.item.owner_id), respondsProfile);
        }
    },
}

const mutations = {
    setResponds(state: any, responds: any) {
        state.userResponds = responds
    }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
