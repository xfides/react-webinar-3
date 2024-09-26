// see webpack.config.devServer.proxy. Absent HOST === localhost
const PATH = '/api/v1/articles';

async function makeRequest(url) {
  let response;

  try {
    const serverResponse = await fetch(url);
    response = await serverResponse.json();
  } catch (err) {
    response =
      err instanceof Error
        ? // request FAILED at all (network problem)
          { error: { message: err.message } }
        : // request SUCCESS but received info contains WRONG DATA
          err;

    return response;
  }

  // request SUCCESS with RIGHT DATA
  return response;
}

export async function getItemsPerPageIndex(pageIndex) {
  const queryParams = {
    limit: 10,
    fields: 'items(_id, title, price),count',
    skip: pageIndex * 10,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${PATH}?${queryString}`;

  return await makeRequest(url);
}

export async function getItemById(itemId) {
  const queryParams = {
    fields: '*,madeIn(title,code),category(title)',
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${PATH}/${itemId}?${queryString}`;

  return await makeRequest(url);
}
