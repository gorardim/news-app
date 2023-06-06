import { gql } from "@apollo/client";

export const GET_SOURCES = gql`
    query Sources {
        sources {
            id
            name
        }
    }
`;
