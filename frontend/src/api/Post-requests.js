/* eslint-disable space-before-function-paren */
import axios from 'axios'

const URL = 'https://codestapi.onrender.com'

const getAllPosts = async () => {
  try {
    const data = await axios.get(URL)
    return data.data.reverse()
  } catch (error) {
    return Promise.reject(error)
  }
}

const getFeaturedPosts = async () => {
  try {
    const data = await axios.get(`${URL}/featured`)
    return data.data.reverse()
  } catch (error) {
    return Promise.reject(error)
  }
}

const getProjectsPosts = async () => {
  try {
    const data = await axios.get(`${URL}/projects`)
    return data.data.reverse()
  } catch (error) {
    return Promise.reject(error)
  }
}

const getPersonalPosts = async (feat) => {
  try {
    if (feat) {
      const response = await axios.get(`${URL}/personal`)
      const datalength = response.data.length
      const data = response.data.reverse()
      if (datalength >= 3) {
        return data.slice(0, 3)
      } else {
        return data
      }
    } else {
      const data = await axios.get(`${URL}/personal`)
      return data.data.reverse()
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const getPost = async (id) => {
  try {
    const data = await axios.get(`${URL}/${id}`)
    return data.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const createPost = async (postdata) => {
  /* const postdata = {
    data: {
      title: 'Renova',
      shorttitle: 'Construction Bussines',
      description: 'Renova description',
      link: 'www.renovacyr.com',
      image: 'https://via.placeholder.com/150'
    },
    screens: [
      {title: 'Image1', image: 'https://via.placeholder.com/500'},
      {title: 'Image2', image: 'https://via.placeholder.com/500'}
    ]
  } */
  try {
    const newPost = await axios.post(`${URL}`, postdata)
    return newPost
  } catch (error) {
    return Promise.reject(error)
  }
}

const updatePost = async (id, newpostdata) => {
  const editepost = await axios.put(`${URL}/${id}`, newpostdata)
  return editepost
}

const deletePost = async (id) => {
  try {
    const deletepost = await axios.delete(`${URL}/${id}`)
    return deletepost
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  getAllPosts,
  getFeaturedPosts,
  getPersonalPosts,
  getProjectsPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}
