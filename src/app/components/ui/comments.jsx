import React, { useState, useEffect } from "react";
import { orderBy } from "lodash";
import api from "../../api";
import { useParams } from "react-router-dom";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComments = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id === id));
        });
    };
    const sortedComments = orderBy(comments, ["created.at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList
                        comments={sortedComments}
                        onRemove={handleRemoveComments}
                    />
                </div>
            </div>
        </>
    );
};
export default Comments;
