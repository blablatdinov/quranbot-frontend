const getQueryParams = () => {
  const queryParamsObject = {};
  new URL(window.location).search.slice(1).split('&').forEach((elem) => {
    const [key, value] = elem.split('=');
    queryParamsObject[key] = value;
  });
  return queryParamsObject;
};

const setQueryPage = (pageNum) => {
  const queryParamsObject = {};
  new URL(window.location).search.slice(1).split('&').forEach((elem) => {
    const [key, value] = elem.split('=');
    if (elem === 'page') {
      queryParamsObject[key] = pageNum;
    } else {
      queryParamsObject[key] = value;
    }
  });
};

const addQueryParam = (param, value) => {
  const queryParams = getQueryParams();
  queryParams[param] = value;
  return Object.entries(queryParams).join('&').replaceAll(',', '=');
};

const getPageNumFromQuery = () => {
  const queryParams = getQueryParams();
  return queryParams.page || 1;
};

export {
  addQueryParam,
  getPageNumFromQuery,
  getQueryParams,
  setQueryPage,
};
