import React from 'react'
import NavigationLink from '../shared/NavigationLink'
import { useAuth } from '../../context/AuthContext'


export const Links = () => {
    const auth = useAuth();
  return (
    <>
          {auth?.isLoggedIn ? (
            <>
                <NavigationLink
                bg="transparent"
                to="/"
                text="Contribute"
                textColor="white"
              />
              <NavigationLink
                bg="transparent"
                to="/chat"
                text="Go To Classroom"
                textColor="white"
              />
              <NavigationLink
                bg="transparent"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
                <NavigationLink
                bg="transparent"
                to="/"
                text="Contribute"
                textColor="white"
              />
              <NavigationLink
                bg="transparent"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="transparent"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </>
  )
}
