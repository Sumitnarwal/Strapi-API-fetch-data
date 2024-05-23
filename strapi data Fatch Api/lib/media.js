import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  // const { url } = media?.data?.attributes;

  // const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;

  // return imageUrl;
  if (
    !media ||
    !media.data ||
    !media.data.attributes ||
    !media.data.attributes.url
  ) {
    return "";
  }

  const { url } = media.data.attributes;

  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;

  return imageUrl;
}
