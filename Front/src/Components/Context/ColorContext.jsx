import React, { createContext, useState } from "react";

const Colorcontext = createContext();

function ColorContext({ children }) {
    const [color, setcolor] = useState(false);
    // console.log("hjguyg,colo",color)

    return (
        <div>
            <Colorcontext.Provider value={{ color, setcolor }}>
                {children}
            </Colorcontext.Provider>
        </div>
    );
}

export default ColorContext;
export { Colorcontext };