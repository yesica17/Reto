const current = `http://localhost:8000/`;

const SETData = async (url, method, params, endpoint = current) => {
  let token = localStorage.getItem('token');
  

  const response = await fetch(`${endpoint}${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'token': `Bearer ${token}`
    },
    body: JSON.stringify(params),
  });
  if (response.ok) {
    const body = await response.text().then(response);

    if (body !== "") {
      return JSON.parse(body);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const GETData = async (url, method, endpoint = current) => {
  let token = localStorage.getItem('token');  

  const response = await fetch(`${endpoint}${url}`, {
    method: method,
    mode: "cors",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      'token': `Bearer ${token}`
      
    }),
  });
  if (response.ok) {
    const body = await response.text().then(response);

    if (body !== "") {
      return JSON.parse(body);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export { SETData, GETData };
