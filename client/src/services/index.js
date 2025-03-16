import axiosInstance from '@/api/axiosInstance';
async function registerService(formData) {
    const {response} = await axiosInstance.post('/auth/register', {
        ...formData,
        role: 'user'
    });
    return response;
    
}
export default registerService;