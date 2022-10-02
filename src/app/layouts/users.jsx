import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/ui/editUserPage";
import UserProvider from "../hooks/useUsers";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <EditUserPage id={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
