import { store } from '..'
import userService from '../../services/userService'

export async function signup(name) {
    try {
        const user = await userService.signUp(name)
        store.dispatch({ type: 'SET_USER', user })
        return Promise.resolve()
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}
export async function loadUser() {
    const user = await userService.getUser()
    if (user) {
        store.dispatch({ type: 'SET_USER', user })
        return user
    }
    return null
}

export function isUserLoggedIn() {
    return !!userService.getUser()
}

export async function transferFunds(contact, amount) {
    try {
        const user = await userService.addMove(
            contact,
            amount
        )
        store.dispatch({ type: 'SET_USER', user })
    } catch (err) {
        console.log('err', err)
    }
}
