import { atom } from "recoil";

export const userInputAtom = atom({
    key:'userInputAtom',
    default:[
        {
            jobRole:'',
            company:'',
            questionList:[
                {
                    question:'',
                    address:'',
                    otherData:''
                }
            ]
        }
    ]
})