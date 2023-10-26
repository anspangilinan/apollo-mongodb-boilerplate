import { createClient } from "@sanity/client";
import { config } from "./config";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a preview client with serverless authentication for drafts
export const sanityPreviewClient = createClient({
  ...config,
  token: process.env.SANITY_API_PREVIEW_TOKEN,
});

export const sanityEditorClient = createClient({
  ...config,
  token: process.env.SANITY_API_EDITOR_TOKEN,
});

// Helper function for easily switching between normal client, preview client and editor client
// export const getSanityClient = usePreview => (usePreview ? sanityPreviewClient : sanityClient);
export const getSanityClient = (clientType) => {
  switch (clientType) {
    case "preview":
      return sanityPreviewClient;
    case "editor":
      return sanityEditorClient;
    default:
      return sanityClient;
  }
};
