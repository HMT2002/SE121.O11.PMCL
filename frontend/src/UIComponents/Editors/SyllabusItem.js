import React from "react";

import Card from "../Commons/Card.js";

import "../../Styles/Syllabus.css";

const SyllabusItem = (props) => {
    return (
        <React.Fragment>
            <Card className="syllabus-item card-0">
                <div>Course Name</div>
                <div>Creator</div>
                <div>Status</div>
                <div>Created Date</div>
                <div>Modified Date</div>
            </Card>
        </React.Fragment>
    )
}

export default SyllabusItem;