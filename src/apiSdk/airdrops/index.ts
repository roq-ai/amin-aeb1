import axios from 'axios';
import queryString from 'query-string';
import { AirdropInterface, AirdropGetQueryInterface } from 'interfaces/airdrop';
import { GetQueryInterface } from '../../interfaces';

export const getAirdrops = async (query?: AirdropGetQueryInterface) => {
  const response = await axios.get(`/api/airdrops${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAirdrop = async (airdrop: AirdropInterface) => {
  const response = await axios.post('/api/airdrops', airdrop);
  return response.data;
};

export const updateAirdropById = async (id: string, airdrop: AirdropInterface) => {
  const response = await axios.put(`/api/airdrops/${id}`, airdrop);
  return response.data;
};

export const getAirdropById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/airdrops/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAirdropById = async (id: string) => {
  const response = await axios.delete(`/api/airdrops/${id}`);
  return response.data;
};
