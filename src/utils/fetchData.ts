const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();

      return {
        data: data,
        status: `OK`,
        statusNumber: res.status,
        error: null,
      };
    }
    if (res.status >= 400 && res.status <= 499) {
      return {
        data: undefined,
        status: `Not found`,
        statusNumber: res.status,
        error: null,
      };
    }

    if (res.status >= 500 && res.status <= 599) {
      throw new Error(`Could not fetch data`);
    }
    return {
      data: undefined,
      status: `Server Error`,
      statusNumber: res.status,
      error: null,
    };
  } catch (error) {
    return {
      data: undefined,
      status: `Error`,
      error: (error as Error).message,
    };
  }
};

export default fetchData;
