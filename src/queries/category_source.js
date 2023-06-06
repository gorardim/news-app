import { gql } from "@apollo/client";

export const CATEGORIES_AND_SOURCES = gql`
    query CategoriesAndSources {
        categories {
            id
            name
        }
        sources {
            id
            name
        }
    }
`;
