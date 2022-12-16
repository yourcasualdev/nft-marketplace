import React from "react";
import Header from "../components/Header";


type Props = {
    children: React.ReactNode;
};

const WithHeader: React.FC<Props> = (children) => {
    return (
        <>
            <Header />
            <div className="pt-20">
                {children}
            </div>
        </>
    );
};

export default WithHeader;