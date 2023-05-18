import { storage, db } from '@/firebase'
import { setDoc, doc, collection, getDocs } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'


const datingCollection = collection(db, 'dating')

const state = {
    datingsProfiles: []
}

const actions = {
    async fetchDatingProfiles({ commit }: any) {
        const querySnapshot = await getDocs(datingCollection)
        const datingData = querySnapshot.docs.map(async (doc) => await doc.data())
        Promise.all(datingData).then((data) => {
            commit('setDatingsProfiles', data)
        })
    },
    async createDatingProfile({ rootState }: any, profile: any) {
        const { files, description } = profile
        const avatar = files[0]
        const storageRef = ref(storage, avatar.name)
        const snapshot = await uploadBytes(storageRef, avatar)
        const downloadURL = await getDownloadURL(snapshot.ref)
        const { firstname, lastname, uuid } = rootState.auth.currentUser
        const datingProfile = {
            firstname,
            lastname,
            description,
            avatar: downloadURL,
            owner_id: uuid,
            uuid: uuidv4()
        }
        await setDoc(doc(db, 'dating', datingProfile.uuid), datingProfile);
    }
}

const mutations = {
    setDatingsProfiles(state: any, datingProfile: any) {
        state.datingsProfiles = datingProfile
    }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
