import api from './axios';

export const submissionService = {
  submitProject: async (eventId, data) => {
    const res = await api.post(`/submissions/${eventId}`, data);
    return res.data;
  },

  getSubmissions: async (eventId) => {
    const res = await api.get(`/submissions/${eventId}`);
    return res.data;
  }
};
