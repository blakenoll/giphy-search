import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY as string);

export async function queryGifs(searchString: string, page: number) {
  const result = await gf.search(searchString, {
    sort: "relevant",
    limit: 10,
    offset: page * 10,
    type: "gifs",
  });
  return result;
}
