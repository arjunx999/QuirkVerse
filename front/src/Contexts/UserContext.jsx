import React, { useContext, createContext, useState, useEffect } from "react";

// creating context
const AppContext = createContext();

//creating provider
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from local storage, or set to null if not present
        // This step prevents from the user being set to null whenever the page is refreshed 
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        // Save user data to local storage whenever it changes
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user"); // Clear user on logout
        }
    }, [user]);
    
    const [posts, setPosts] = useState(() => {
        const savedPost = sessionStorage.getItem("post")
        return savedPost ? JSON.parse(savedPost) : null;
    });

    useEffect(() => {
        if(posts) {
            sessionStorage.setItem("post", JSON.stringify(posts))
        } else {
            sessionStorage.removeItem("post")
        }
    }, [posts])

    const [person, setPerson] = useState(() => {
        const savedPerson = sessionStorage.getItem("person")
        return savedPerson ? JSON.parse(savedPerson) : null;
    });

    useEffect(() => {
        if(person) {
            sessionStorage.setItem("person", JSON.stringify(person))
        } else {
            sessionStorage.removeItem("person")
        }
    }, [person])

    //state variables to be used throughout the application
    const contextValue = {
        user,
        setUser,
        posts,
        setPosts,
        person,
        setPerson,
    };
    
    return (
        <AppContext.Provider value={contextValue}>
          {children}   {/* all nested components inside the AppProvider  */}
        </AppContext.Provider>
      );
}

export const useAppContext = () => useContext(AppContext);