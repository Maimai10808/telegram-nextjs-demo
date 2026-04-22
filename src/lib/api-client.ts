export async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function apiPost<TResponse, TBody extends object>(
  url: string,
  body: TBody,
): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as TResponse;

  if (!response.ok) {
    throw new Error(
      (data as { error?: string }).error ??
        `POST ${url} failed with ${response.status}`,
    );
  }

  return data;
}
