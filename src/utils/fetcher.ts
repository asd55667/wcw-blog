export const fetcher = (input: string | URL | Request, init?: RequestInit) => {
  if (typeof input === "string") {
    console.log(process.env.NEXT_PUBLIC_API_URL + input);
    return fetch(process.env.NEXT_PUBLIC_API_URL + input, init).then((res) =>
      res.json(),
    );
  }

  return fetch(input, init).then((res) => res.json());
};
