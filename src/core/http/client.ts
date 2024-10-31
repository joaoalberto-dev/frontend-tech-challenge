type FetchOptions = RequestInit;

async function httpClient<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok)
      throw new Error(
        `HTTP error! status: ${response.status}, statusText: ${response.statusText}`,
      );

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data: T = await response.json();

      return data;
    } else {
      throw new Error(`Unexpected content type: ${contentType}`);
    }
  } catch (error) {
    throw error;
  }
}

function createHttpClient(baseUrl: string) {
  return {
    get: <T>(path: string, options: FetchOptions = {}) =>
      httpClient<T>(baseUrl + path, { ...options, method: "GET" }),
  };
}

export { createHttpClient, httpClient };
