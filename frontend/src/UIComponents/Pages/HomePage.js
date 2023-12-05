import React from "react";

import EditorDashboard from "../Editors/EditorDashboard";

const HomePage = (props) => {
    return (
        <React.Fragment>
            <div className="page">
                <EditorDashboard />
            </div>
        </React.Fragment>
    );
}

export default HomePage;