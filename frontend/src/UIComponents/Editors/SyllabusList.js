import React, { useEffect } from "react";

import SyllabusItem from "./SyllabusItem";
import SyllabusAPI from "../../APIs/SyllabusAPI";

const SyllabusList = (props) => {
    useEffect(() => {
        // console.log("Syllabus list init!");
        const GetAllSyllabuses = async () => {
            const result = await SyllabusAPI.GET_Syllabuses();

            const syllabus = result.GetData();

            console.log();
        }

        GetAllSyllabuses();
    }, []);

    return (
        <React.Fragment>
            <SyllabusItem />
        </React.Fragment>
    );
}

export default SyllabusList;