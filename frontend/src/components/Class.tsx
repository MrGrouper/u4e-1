//@ts-expect-error blah
import React, { useState, useEffect } from "react";
// import { getUser } from '../helpers/api-communicator'
import { Types } from "mongoose";
import { getUser } from "../helpers/api-communicator";
// import NavigationLink from "./shared/NavigationLink";
import { Link } from "react-router-dom";

type Classroom = {
  id: Types.ObjectId;
  members: string[];
  createdAt: string;
  updatedAt: string;
  subject?: string;
};

type User = {
  _id: Types.ObjectId;
  createdAt: string;
  email: string;
  firstname: string;
  isAdmin: boolean;
  isTeacher: boolean;
  lastname: string;
  subjects: string[];
  updatedAt: string;
};


const Class = ({
  data,
  currentUser,

}: {
  data: Classroom;
  currentUser: any;

}) => {
  

  const [userData, setUserData] = useState<User | null>(null);


  useEffect(() => {
    const userId = data.members.find((id: unknown) => id !== currentUser._Id);
    const getUserData = async () => {
      try {
        const otherUserData: User = await getUser(userId);
        setUserData(otherUserData);
      } catch (error) {
        console.log(error);
      } 
    };
    getUserData();
  }, []);


  return (
    <>
          <p>
          <Link 
          to= {`../classroom/${data.id}`}  
          state={{data, currentUser, userData }}
          style={{ background: "transparent", color: "white" }}
          >
           { data.subject }
            </Link>
          </p>
        </>
    
  )
};

export default Class;
