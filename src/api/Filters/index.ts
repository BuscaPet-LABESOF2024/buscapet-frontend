import api from '../api'

export const fetchAnnouncementTypes = async () => {
  const { data } = await api.get('/announcement/types')
  return data
}

export const fetchNeighborhoods = async () => {
  const { data } = await api.get('/address/neighborhoods')
  return data
}

export const fetchBreeds = async () => {
  const { data } = await api.get('/animal/breeds')
  return data
}

export const FilterApi = {
  fetchAnnouncementTypes,
  fetchNeighborhoods,
  fetchBreeds,
}

export interface FilterFormData {
  announcementType: string
  neighborhood: string
  animalBreed: string
}