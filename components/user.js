function User({ user }) {
    return (<>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.gender}</p>
    </>);
}

export default User;