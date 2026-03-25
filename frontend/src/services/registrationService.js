import api from './axios';

export const registrationService = {
  registerForEvent: async (eventId, teamId = null) => {
    const res = await api.post(`/events/${eventId}/register`, { teamId });
    return res.data;
  },

  getParticipants: async (eventId) => {
    const res = await api.get(`/events/${eventId}/participants`);
    return res.data;
  }
};
