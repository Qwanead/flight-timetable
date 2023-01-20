type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type RequestParams = {
  url: string,
  method?: Method,
  body?: unknown,
};

const httpRequest = ({ url, method, body }: RequestParams) => fetch(
  url,
  {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  },
)
  .then((res) => res.json());

export default httpRequest;
