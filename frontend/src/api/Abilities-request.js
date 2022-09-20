/* eslint-disable space-before-function-paren */
import axios from 'axios'

const URL = 'https://codestapi.onrender.com/abilities'

const getAllAbilities = async () => {
  try {
    const data = await axios.get(URL)
    return data.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const getAbility = async (id) => {
  try {
    const data = await axios.get(`${URL}/${id}`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

const createAbility = async (abilitydata) => {
  /* const postdata = {
    data: {
      title: 'Renova',
      shorttitle: 'Construction Bussines',
      description: 'Renova description',
      link: 'www.renovacyr.com',
      image: 'https://via.placeholder.com/150'
    },
    screens: {
      home: 'image link'
    }
  } */
  try {
    const newAbility = await axios.post(`${URL}`, abilitydata)
    return newAbility
  } catch (error) {
    return Promise.reject(error)
  }
}

const updateAbility = async (id, newabilitydata) => {
  const editability = await axios.put(`${URL}/${id}`, newabilitydata)
  return editability
}

const deleteAbility = async (id) => {
  try {
    const deleteability = await axios.delete(`${URL}/${id}`)
    return deleteability
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  getAllAbilities,
  getAbility,
  createAbility,
  updateAbility,
  deleteAbility
}
