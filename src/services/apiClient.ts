import { API_BASE_URL } from "@/config/constants";

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
}

async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;

  const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags) nextOptions.tags = tags;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    next: Object.keys(nextOptions).length ? nextOptions : undefined,
  });

  const contentType = response.headers.get("content-type");

  let responseData: any = null;

  if (contentType?.includes("application/json")) {
    responseData = await response.json();
  }

  if (!response.ok) {
    const message =
      responseData?.message ||
      responseData?.error ||
      `API Error: ${response.status}`;

    throw new Error(message);
  }

  return responseData as T;
}

export default apiClient;
