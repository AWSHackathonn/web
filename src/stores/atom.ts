import { atom } from "recoil";

interface Question {
    question: string;
    address: string[];
    otherData: string;
  }
  
  interface UserInput {
    jobRole: string;
    company: string;
    questionList: Question[];
  }

export const userInputAtom = atom<UserInput>({
    key:'userInputAtom',
    default:{
        
            jobRole:'',
            company:'',
            questionList:[
                {
                    question:'',
                    address:[],
                    otherData:''
                },
                
            ]
    }
})

export const isOk=atom({
    key:'isOkay',
    default:false
})

export const userInputURLAtom=atom<string[]>({
    key:'userInputURLAtom',
    default:[]
})