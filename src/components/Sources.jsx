import { useQuery } from "@apollo/client";
import { GET_SOURCES } from "../queries/sources"

const Sources = ({handelClickSource}) => {
    const {loading: queryLoading, error, data} = useQuery(GET_SOURCES);
    if (queryLoading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { sources } = data;

    return (
        <>
            <h3 className="mt-4">All Sources</h3>
            <p>Lorem ipsum dolor sit ame.</p>
            <ul className="nav nav-pills flex-column">
                {sources.map((source) => (
                    <li className="nav-item" key={source.id} onClick={() => handelClickSource(source.id)}>
                        <a className="nav-link" style={{cursor: "pointer"}}>
                        {source.name}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Sources;