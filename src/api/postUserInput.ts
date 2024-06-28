import { instance } from ".";

interface Question {
    question: string;
    address: string[];
    otherData: string;
  }

interface PostUserInputType{
    jobRole: string;
    company: string;
    questionList: Question[];
}

export const postUserInput = async (body: PostUserInputType) => {
    try {
        const response = await instance.post('/input_lambda', body);
        return response.data;
    } catch (error) {
        console.error('Error posting user input:', error);
        throw error;
    }
};