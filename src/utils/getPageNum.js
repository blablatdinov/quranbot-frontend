const getQueryParams = () => {
  const queryParamsObject = {};
  new URL(window.location).search.slice(1).split('&').forEach((elem) => {
    const [key, value] = elem.split('=');
    queryParamsObject[key] = value;
  });
  return queryParamsObject;
};

const addQueryParam = (param, value) => {
  const queryParams = getQueryParams();
  queryParams[param] = value;
  return Object.entries(queryParams).join('&').replaceAll(',', '=');
};

const getPageNumFromQuery = () => {
  const queryParams = getQueryParams();
  return queryParams.page;
};

export { addQueryParam, getPageNumFromQuery };
