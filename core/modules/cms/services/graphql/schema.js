import { gql } from '@apollo/client';

export const getCmsPage = gql`
    query($identifier: String!) {
        cmsPage(identifier: $identifier) {
            identifier
            content
            meta_description
            meta_keywords
            title
            url_key
        }
    }
`;

export const getInstagramToken = gql`
{
    instagramToken {
      token
    }
}
`;

export const getPageBuilderTemplate = gql`
query($identifier: String!){
    getPageBuilderTemplate(id: $identifier){
        data
    }
}
`;

export const getInstagramFeed = gql`
mutation getInstagramFeed($token: String!) {
    internalGetInstagramFeed(token: $token) {
        message
        data {
            id
            media_type
            media_url
            permalink
            caption
            username
        }
        err
    }
}
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getProductReviews = gql`
    query getProductReviews($sku: String!) {
        products(filter: { 
            sku: {
                eq: $sku
            }
         }) {
            items {
                id
                sku
                name
                url_key
                small_image {
                    url
                    label
                }
                reviews {
                    items {
                        nickname
                        summary
                        created_at
                        text
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
`;

export default { getCmsPage };
