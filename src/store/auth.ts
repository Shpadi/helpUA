import { auth, db } from '@/firebase'
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index'
import { v4 as uuidv4 } from 'uuid'


const usersCollection = collection(db, 'users')

const state = {
    currentUser: null,
    loginError: null
}

type SignUpUser = {
    email: string;
    password: string; 
    firstname: string;
    lastname: string;
}

const actions = {
    registerUser({ commit }: any, user: SignUpUser) {
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                const credUser = userCredential.user;
                localStorage.setItem('crd', JSON.stringify(credUser))
                const userToSave = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    uuid: uuidv4()
                }
                commit('setUser', credUser)
                await setDoc(doc(db, 'users', userToSave.uuid), userToSave);
                router.push({ name: 'home' })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    },
    loginUser({ commit }: any, user: { email: string; password: string; }) {
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('crd', JSON.stringify(user))
                commit('setUser', user)
                router.push({ name: 'home' })
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    commit('setLoginError', 'Wrong Email or Password')
                }
            });
    },
}

const mutations = {
    setUser(state: any, user: any) {
        state.currentUser = user
    },
    setLoginError(state: any, error: string) {
        state.loginError = error
    }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
