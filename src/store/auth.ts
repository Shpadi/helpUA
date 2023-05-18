import { auth, db } from '@/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
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
                    uuid: userCredential.user.uid
                }
                commit('setUser', userToSave)
                await setDoc(doc(db, 'users', userToSave.uuid), userToSave);
                router.push({ name: 'home' })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    },
    loginUser({ commit, dispatch }: any, user: { email: string; password: string; }) {
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('crd', JSON.stringify(user))
                dispatch('fetchUser', user.uid)
                router.push({ name: 'home' })
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    commit('setLoginError', 'Wrong Email or Password')
                }
            });
    },
    async fetchUser({ commit }: any, uuid: string) {
        const userRef = doc(db, 'users', uuid)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
            const userData = userSnap.data()
            commit('setUser', userData)
        } else {
            router.push({ name: 'login' })
        }
    }
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
