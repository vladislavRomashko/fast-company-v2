import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";

const EditForm = ({ id }) => {
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    const params = useParams();
    const history = useHistory();
    console.log(history);
    const { userId } = params;

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const prof = getProfessionById(user.profession);
        console.log(prof);
        const qual = getQualities(user.qualities);
        console.log(qual);
        api.users
            .update(id, {
                ...user,
                profession: prof,
                qualities: qual
            })
            .then((response) => console.log(response));
        history.push(`/users/${id}`);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user && (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронаня почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                name="profession"
                                value={user.profession.name}
                                options={professions}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={user.qualities.map((item) => ({
                                    label: item.name,
                                    value: item._id,
                                    color: item.color
                                }))}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    )}
                    {!user && (
                        <div className="d-flex justify-content-center  mt-4">
                            <div
                                className="spinner-border"
                                role="status"
                                style={{ width: "3rem", height: "3rem" }}
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

EditForm.propTypes = {
    id: PropTypes.string
};

export default EditForm;
