import { auth, db } from '@/firebase'
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index'
import { v4 as uuidv4 } from 'uuid'


const datingCollection = collection(db, 'dating')

const state = {
    currentUser: null,
    loginError: null
}

const actions = {
}

const mutations = {
   
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
