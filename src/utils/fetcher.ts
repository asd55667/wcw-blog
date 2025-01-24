export const fetcher = (input: string | URL | Request, init?: RequestInit) => {
  if (typeof input === "string") {
    const url = process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL + input
      : input;
    return fetch(url, init).then((res) => res.json());
  }

  return fetch(input, init).then((res) => res.json());
};
