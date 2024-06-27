import React from "react";
import BigButton from "../button/BigButton";

const UserInput = () => {
  const onSubmit=()=>{
    console.log("버튼 눌림");
  }

  return <div>
    <div>userInput페이지</div>
    <BigButton text="제출" event={onSubmit}/>
    </div>;
};

export default UserInput;
