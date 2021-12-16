const current = `http://localhost:8000/`;

const SETData = async (url, method, params, endpoint = current) => {
  //let token = localStorage.getItem('token');

  const response = await fetch(`${endpoint}${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //    'Authorization': `Bearer ${token}`
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

const SETFile = async (url, method, params, endpoint = current) => {
  let token = localStorage.getItem("token");

  const response = await fetch(`${endpoint}${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: params,
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

const GETFile = async (url, method, params, endpoint = current) => {
  let token = localStorage.getItem("token");

  const response = await fetch(`${endpoint}${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });

  if (response.ok) {
    return response;
  } else {
    return null;
  }
};

const GETData = async (url, method, endpoint = current) => {
  //let token = localStorage.getItem('token');

  const response = await fetch(`${endpoint}${url}`, {
    method: method,
    mode: "cors",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
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

export { SETData, SETFile, GETData, GETFile };
