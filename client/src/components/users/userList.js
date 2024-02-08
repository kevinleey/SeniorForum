import React from 'react';

function UserList({ users }) {
    if (!users || users.length === 0) {
        return <p>No users to display</p>;
    }

    return(
        <div>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user._id}>{user.firstName}</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default UserList;