import React from "react";

const MainContainer = ({ children }) => {
    return (
        <div className="max-w-5xl mx-auto px-4 " >
            {children}
        </div>
    )
}

export default MainContainer