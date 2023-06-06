import { useQuery } from "@apollo/client";
import { GET_ME } from "../queries/me"

const Me = () => {
    const {loading: queryLoading, error, data} = useQuery(GET_ME);
    if (queryLoading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { me } = data;
    
    if(!me) return <a href="/login">Login</a>;

    return (
        <>
            <h2>About Me</h2>
            <div className="fakeimg">{me.name}</div>
            <p>
                {me.email}
            </p>
            <a href="/update-me">Update Profile</a>
            <br />
        </>
    );
};

export default Me;