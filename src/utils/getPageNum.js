const getPageNumFromQuery = () => {
  const queryParamsObject = {};
  new URL(window.location).search.slice(1).split('&').forEach((elem) => {
    const [key, value] = elem.split('=');
    queryParamsObject[key] = value;
  });
  return queryParamsObject.page;
};

export default getPageNumFromQuery;
