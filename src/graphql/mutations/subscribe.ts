import { graphql } from "../__gen__";

// This mutation assumes a WordPress plugin like WPGraphQL for Mailchimp or a custom resolver
// For now, I'll define a generic one or use a "createNewsletterSubscription" if available.
// If not using a specific plugin, this might be a custom mutation.
export const SubscribeMutation = graphql(`
  mutation Subscribe($email: String!, $username: String!) {
    createUser(input: { email: $email, username: $username }) {
      user {
        id
      }
    }
  }
`);
