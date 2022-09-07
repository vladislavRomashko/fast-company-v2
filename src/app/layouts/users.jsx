import React from "react";
import { useParams, useHistory, Route } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditForm from "../components/ui/editForm";
const Users = () => {
    const params = useParams();
    const history = useHistory();
    const { userId } = params;
    const { location } = history;

    return (
        <>
            {location.pathname.includes("edit") ? (
                <Route path="/users/:userId/edit">
                    <EditForm id={userId} />
                </Route>
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
