import { instance } from ".";


export const getIntroduceFile = async () => {
    try {
        const response = await instance.get('/introduceFile');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};