import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/categories"

const Categories = ({handelClickCategory}) => {
    const {loading: queryLoading, error, data} = useQuery(GET_CATEGORIES);
    if (queryLoading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { categories } = data;

    return (
        <>
            <h3 className="mt-4">All Categories</h3>
            <p>Lorem ipsum dolor sit ame.</p>
            <ul className="nav nav-pills flex-column">
                {categories.map((category) => (
                    <li className="nav-item" key={category.id} onClick={() => handelClickCategory(category.id)}>
                        <a className="nav-link" style={{cursor: "pointer"}}>
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Categories;