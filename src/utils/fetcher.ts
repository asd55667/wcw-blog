export const fetcher = (input: string | URL | Request, init?: RequestInit) => {
  if (typeof input === "string") {
    let url = input;

    if (process.env.NEXT_PUBLIC_API_URL) {
      url = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    }

    return fetch(url, init).then((res) => res.json());
  }

  return fetch(input, init).then((res) => res.json());
};
