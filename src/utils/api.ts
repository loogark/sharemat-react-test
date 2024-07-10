import { ApiResponse, QueryParams } from "../types";

const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchData<T>(
  endpoint: string,
  queries: QueryParams = {}
): Promise<any> {
  try {
    let url = `${BASE_URL}/${endpoint}`;
    const allQueries = { ...queries };

    // Convert queries object to URL search params
    const searchParams = new URLSearchParams();
    Object.entries(allQueries).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });

    // Append the search params to the URL
    url += `?${searchParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json as ApiResponse<T>;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
