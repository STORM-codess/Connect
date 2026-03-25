import api from './axios';

export const eventService = {
  createEvent: async (eventData) => {
    const res = await api.post('/events/create', eventData);
    return res.data;
  },

  getApprovedEvents: async () => {
    const res = await api.get('/events');
    return res.data;
  },

  getOrganizerEvents: async () => {
    const res = await api.get('/events/my-events');
    return res.data;
  },

  getEventById: async (id) => {
    const res = await api.get(`/events/${id}`);
    return res.data;
  },

  updateEvent: async (id, updatedData) => {
    const res = await api.put(`/events/${id}`, updatedData);
    return res.data;
  },

  deleteEvent: async (id) => {
    const res = await api.delete(`/events/${id}`);
    return res.data;
  },

  approveEvent: async (id) => {
    const res = await api.put(`/admin/approve-event/${id}`);
    return res.data;
  },

  rejectEvent: async (id) => {
    const res = await api.put(`/admin/reject-event/${id}`);
    return res.data;
  }
};
