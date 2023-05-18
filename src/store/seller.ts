import { storage, db } from '@/firebase'
import { setDoc, doc, collection, getDocs } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'


const sellerCollection = collection(db, 'seller')

const state = {
    sellItems: []
}

const actions = {
    async fetchSellItems({ commit }: any) {
        const querySnapshot = await getDocs(sellerCollection)
        const sellData = querySnapshot.docs.map(async (doc) => await doc.data())
        Promise.all(sellData).then((data) => {
            commit('setSellItems', data)
        })
    },
    async createSellerItem({ rootState }: any, profile: any) {
        const { files, description } = profile
        const avatar = files[0]
        const storageRef = ref(storage, avatar.name)
        const snapshot = await uploadBytes(storageRef, avatar)
        const downloadURL = await getDownloadURL(snapshot.ref)
        const { firstname, lastname, uuid } = rootState.auth.currentUser
        const sellItem = {
            firstname,
            lastname,
            description,
            avatar: downloadURL,
            owner_id: uuid,
            uuid: uuidv4()
        }
        await setDoc(doc(db, 'seller', sellItem.uuid), sellItem);
    }
}

const mutations = {
    setSellItems(state: any, sellItems: any) {
        state.sellItems = sellItems
    }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
