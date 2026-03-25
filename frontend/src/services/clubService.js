import api from './axios';

export const clubService = {
  createClub: async (clubData) => {
    const res = await api.post('/clubs/create', clubData);
    return res.data;
  },

  getAllClubs: async () => {
    const res = await api.get('/clubs');
    return res.data;
  },

  getClubById: async (id) => {
    const res = await api.get(`/clubs/${id}`);
    return res.data;
  },

  followClub: async (id) => {
    const res = await api.post(`/clubs/follow/${id}`);
    return res.data;
  }
};
