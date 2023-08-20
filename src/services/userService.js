import { utilService } from './utilService.js'
import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
var gFilterBy = { txt: '', minSpeed: 0 }

// _createUsers()

export const userService = {
  query,
  get,
  remove,
  save,
  getEmptyUser,
  getNextUserId,
  getFilterBy,
  setFilterBy,
  getUser,
  signup,
  transferFunds,
}

async function getUser() {
  const user = sessionStorage.getItem(USER_KEY)
  if (user) return JSON.parse(user)

  return null
}

async function transferFunds(contact, amount, user) {
  const userToUpdate = user

  if (amount > userToUpdate.coins) {
    alert('Insufficient funds')
    return userToUpdate
  }

  userToUpdate.coins -= amount

  const move = {
    to: contact.name,
    amount: amount,
    at: new Date(),
  }

  userToUpdate.moves.push(move)
  await saveUser(userToUpdate)
  await save(userToUpdate)

  return userToUpdate
}

async function signup(name) {
  if (!name) return

  const user = {
    name,
    coins: 1024.68,
    moves: [],
  }

  const loggedInUser = await save(user)
  await saveUser(loggedInUser)
}

async function query() {
  let users = await storageService.query(USER_KEY)
  return users
}

function get(userId) {
  return storageService.get(USER_KEY, userId)
}

function remove(userId) {
  return storageService.remove(USER_KEY, userId)
}

async function saveUser(user) {
  const userJson = JSON.stringify(user)
  sessionStorage.setItem(USER_KEY, userJson)
}

function save(user) {
  if (user._id) {
    return storageService.put(USER_KEY, user)
  } else {
    return storageService.post(USER_KEY, user)
  }
}

function getEmptyUser(vendor = '', maxSpeed = 0) {
  return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
  return gFilterBy
}

async function getNextUserId(userId) {
  const users = await storageService.query(USER_KEY)
  var idx = users.findIndex((user) => user.id === userId)
  if (idx === users.length - 1) idx = -1
  return users[idx + 1].id
}

function _createUsers() {
  let users = utilService.loadFromStorage(USER_KEY)
  if (!users || !users.length) {
    users = usersArr

    utilService.saveToStorage(USER_KEY, users)
  }
}

function _createUser(vendor, maxSpeed = 250) {
  const user = getEmptyUser(vendor, maxSpeed)
  user.id = utilService.makeId()
  return user
}
