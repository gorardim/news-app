import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
    query GetArticles(
        $search: String
        $first: Int
        $page: Int
        $category_id: ID
        $source_id: ID
    ) {
        articles(
            search: $search
            first: $first
            page: $page
            category_id: $category_id
            source_id: $source_id
        ) {
            data {
                id
                category {
                    id
                    name
                }
                source {
                    id
                    name
                }
                title
                author
                content
                description
                published_at
                url_to_image
                url
            }
            paginatorInfo {
                count
                currentPage
                total
                lastPage
            }
        }
    }
`;
