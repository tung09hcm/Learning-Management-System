import axiosInstance from '@/api/axiosInstance';
async function registerService(formData) {
    const {response} = await axiosInstance.post('/auth/register', {
        ...formData,
        role: 'user'
    });
    return response;
    
}
async function loginService(formData) {
    const response = await axiosInstance.post('/auth/login', formData);
    console.log("Response_Login_service:", response);
    return response;
    
}
async function checkAuth() {
    const response = await axiosInstance.get('/auth/check-auth');
    return response;
    
}
async function mediaUploadService(formData, onProgressCallback) {
    const {data} = await axiosInstance.post('/media/upload', formData, {
        onUploadProgress: (progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
            onProgressCallback(percentCompleted)
        })
    });
    return data;
    
}
export { registerService, loginService, checkAuth,mediaUploadService };