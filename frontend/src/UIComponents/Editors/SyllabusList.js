import React, { useEffect, useState } from "react";

import SyllabusItem from "./SyllabusItem";
import SyllabusAPI from "../../APIs/SyllabusAPI";


const SyllabusList = (props) => {
    const [syllabusItems, SetSyllabusItems] = useState([]);

    useEffect(() => {
        const GetAllSyllabuses = async () => {
            let syllabuses = await SyllabusAPI.GET_Syllabuses();

            syllabuses = syllabuses.map((syllabus, index) => {
                return (<li key={index}>
                    <SyllabusItem key={index} data={syllabus} />
                </li>);
            });

            SetSyllabusItems(syllabuses);
        }

        GetAllSyllabuses();
    }, []);

    return (
        <React.Fragment>
            <div>
                <ul>
                    {syllabusItems};
                </ul>
            </div>
        </React.Fragment>
    );
}

export default SyllabusList;