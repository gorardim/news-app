import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export const REGISTER_MUTATION = gql`
    mutation Register(
        $name: String!
        $email: String!
        $password: String!
        $password_confirmation: String!
    ) {
        register(
            name: $name
            email: $email
            password: $password
            password_confirmation: $password_confirmation
        ) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($name: String!, $email: String!) {
        updateProfile(name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword(
        $current_password: String!
        $password: String!
        $password_confirmation: String!
    ) {
        updatePassword(
            current_password: $current_password
            password: $password
            password_confirmation: $password_confirmation
        ) {
            id
            name
            email
        }
    }
`;
