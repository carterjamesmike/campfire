import {gql} from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        firstName
        lastName
        email
        stories {
            _id
            storyName
            totalEntries
            storyText {
                _id
                createdBy {
                    _id
                    firstName
                    lastName
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

export const QUERY_USER = gql`
query user($userId: ID!) {
    user(userId: $userId) {
        _id
        firstName
        lastName
        email
        stories {
            _id
            storyName
            totalEntries
            storyText {
                _id
                createdBy {
                    _id
                    firstName
                    lastName
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

export const QUERY_USERS = gql`
query users {
    users {
        _id
        firstName
        lastName
        email
        stories {
            _id
            storyName
            totalEntries
            storyText {
                _id
                createdBy {
                    _id
                    firstName
                    lastName
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

export const QUERY_STORY = gql`
query story($storyId: ID!) {
    story(storyId: $storyId) {
        _id
        storyName
        totalEntries
        storyText {
            _id
            createdBy {
                _id
                firstName
                lastName
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

export const QUERY_CAMPFIRE = gql`
query campfire($campfireId: ID!) {
    campfire(campfireId: $campfireId) {
        _id
        campfireName
        users {
            _id
            firstName
            lastName
        }
        stories {
            _id
            storyName
            totalEntries
            storyText {
                _id
                createdBy {
                    _id
                    firstName
                    lastName
                }
                text
            }
        }
    }
}
`;

export const QUERY_CAMPFIRES = gql`
query campfires {
    campfires {
        _id
        campfireName
        users {
            _id
            firstName
            lastName
        }
        stories {
            _id
            storyName
            totalEntries
            storyText {
                _id
                createdBy {
                    _id
                    firstName
                    lastName
                }
                text
            }
        }
    }
}
`;

