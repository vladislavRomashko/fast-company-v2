import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const UserQualities = getQuality(id);
    if (!isLoading) {
        return (
            <>
                {UserQualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        );
    } else return "Loading ...";
};

QualitiesList.propTypes = {
    id: PropTypes.array
};

export default QualitiesList;
