import { store } from '..'
import { contactService } from '../../services/contactService'

export async function loadContacts() {

    const { filterBy } = store.getState().contactModule
    try {
        const contacts = await contactService.getContacts(filterBy)
        store.dispatch({ type: 'SET_CONTACTS', contacts })
    } catch (err) {
        console.log('err', err)
    }
}

export async function removeContact(contactId) {
    try {
        await contactService.deleteContact(contactId)
        store.dispatch({ type: 'REMOVE_CONTACT', contactId })
    } catch (error) {
        console.log('error:', error)

    }
}

export async function saveContact(contactToSave) {
    try {
        const contact = await contactService.saveContact(contactToSave)
        const type = contactToSave._id ? 'UPDATE_CONTACT' : 'ADD_CONTACT'
        store.dispatch({ type, contact })
    } catch (error) {
        console.log('error:', error)
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: 'SET_FILTER_BY', filterBy })
}

export async function getContactById(id) {
    try {
        const contact = await contactService.getContactById(id)
        return contact
    } catch (err) {
        console.log('err', err)
    }
}
