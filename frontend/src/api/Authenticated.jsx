import { memo, useState, useEffect } from 'react';

const Authenticated = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated]= useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [])
    return isAuthenticated && children;
}
export default memo(Authenticated);