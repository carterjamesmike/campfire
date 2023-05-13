import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            email
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            email
        }
    }
}
`; 

export const ADD_STORY = gql`
mutation addStory($storyName: String!, $campfire: ID!) {
    addStory(storyName: $storyName, campfire: $campfire) {
        _id
        storyName
        totalEntries
        storyText {
            _id
            createdBy {
                _id
                email
            }
            text
        }
        campfire {
            _id
            campfireName
        }
    }
}
`;

export const ADD_STORY_TEXT = gql`
mutation addStoryText($storyId: ID!, $text: String!) {
    addStoryText(storyId: $storyId, text: $text) {
        _id
        storyName
        totalEntries
        storyText {
            _id
            createdBy {
                _id
                email
            }
            text
        }
        campfire {
            _id
            campfireName
        }
    }
}
`;


