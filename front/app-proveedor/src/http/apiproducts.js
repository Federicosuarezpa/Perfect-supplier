const apiUrl = 'http://localhost:3000/Productos';


async function fetchProductsApi(path, { body, method }) {
  const token = localStorage.getItem('token');
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (token) {
    headers.append('Authorization', token);
  }
  const request = await fetch(`${apiUrl}${path}`, { headers: headers, method: method, body: JSON.stringify(body) });
  const requestData = await request.json();
  if (requestData.status === 'error') {
    throw requestData.message;
  }
  return requestData;
}

