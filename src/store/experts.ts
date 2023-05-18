import { storage, db } from '@/firebase'
import { setDoc, doc, collection, getDocs } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'


const expertsCollection = collection(db, 'experts')

const state = {
    experts: []
}

const actions = {
    async fetchExperts({ commit }: any) {
        const querySnapshot = await getDocs(expertsCollection)
        const expertsData = querySnapshot.docs.map(async (doc) => await doc.data())
        Promise.all(expertsData).then((data) => {
            commit('setExperts', data)
        })
    },
    async createExpertsItem({ rootState }: any, profile: any) {
        const { files, description, skills } = profile
        const avatar = files[0]
        const storageRef = ref(storage, avatar.name)
        const snapshot = await uploadBytes(storageRef, avatar)
        const downloadURL = await getDownloadURL(snapshot.ref)
        const { firstname, lastname, uuid } = rootState.auth.currentUser
        const expert = {
            firstname,
            lastname,
            description,
            skills,
            avatar: downloadURL,
            owner_id: uuid,
            uuid: uuidv4()
        }
        await setDoc(doc(db, 'experts', expert.uuid), expert);
    }
}

const mutations = {
    setExperts(state: any, experts: any) {
        state.experts = experts
    }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
