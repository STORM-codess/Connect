import api from './axios';

export const adminService = {
  getDashboardAuth: async () => {
    const res = await api.get('/admin/dashboard');
    return res.data;
  },

  verifyClub: async (id) => {
    const res = await api.put(`/admin/verify-club/${id}`);
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
