import qs from "qs";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import * as gQuery from "../src/graphql/index";
const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const BASE_URL_GRAPHQL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const AuthToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;


export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export function getStrapiMediaURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Prevent caching

    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);
  const data = await response.json();

  return data;
}

//////////////////////////////////////////////
const graphQlInterceptor = async (query, payload) => {
  try {
    const client = new ApolloClient({
      cache: new InMemoryCache({
        resultCaching: false,
      }),
      uri: `${BASE_URL_GRAPHQL}/graphql`,
    });
    let clientOption;
    if (payload) {
      clientOption = {
        query: query,
        variables: payload,
      };
    } else {
      clientOption = {
        query: query,
      };
    }
    const data = await client.query(clientOption);
    return data;
  } catch (error) {
    console.log(
      "GraphQL API Response Error: ",
      error.message +
        "GraqhQL API === " +
        JSON.stringify(query).substring(0, 100) +
        "..."
    );
    return (
      error.message +
      " GraqhQL Query: " +
      JSON.stringify(query).substring(0, 100) +
      "..."
    );
  }
};


export const allBlogs = async (local) => {
  if(local == "hi-IN") {
    const data = await graphQlInterceptor(gQuery.BLOG_HINDI);
    return data?.data?.blogs;
  } else {
    const data = await graphQlInterceptor(gQuery.BLOG);
    return data?.data?.blogs;
  }
};

