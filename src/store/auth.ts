import { auth, db } from '@/firebase';
import { collection, addDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import router from '@/router/index'


const usersCollection = collection(db, 'users')

const state = {
    currentUser: null,
    loginError: null
}

const actions = {
    registerUser({ commit }: any, user: { email: string; password: string; }) {
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                const credUser = userCredential.user;
                localStorage.setItem('crd', JSON.stringify(credUser))
                commit('setUser', credUser)
                const { password, ...otherInfo } = user
                await addDoc(usersCollection, otherInfo);
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
