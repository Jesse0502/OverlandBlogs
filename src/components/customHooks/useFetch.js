import React, { useEffect, useState } from 'react';

function useFetch(url, type, postBody) {
  const [fetchData, setFetchData] = useState('');
  const [fetchError, setFetchErr] = useState('');
  const [fetchIsPending, setFetchIsPending] = useState(true);
  useEffect(() => {
    let done = false;
    function getData() {
      if (type === 'GET' && !done) {
        fetch(`https://s5po6.sse.codesandbox.io/${url}`)
          .then((res) => {
            setFetchIsPending(false);
            return res.json();
          })
          .then((result) => {
            setFetchData(result);
            setFetchErr(null);
          })
          .catch((err) => {
            setFetchErr(err.message);
            setFetchIsPending(false);
          });
      }
      if (type === 'POST' && postBody && !done) {
        fetch(`https://s5po6.sse.codesandbox.io${url}`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        })
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            setFetchIsPending(false);
            setFetchData(result);
          })
          .catch((err) => {
            setFetchErr(err);
            setFetchIsPending(false);
          });
      }
    }
    getData();
    return () => {
      done = true;
    };
  }, [url, postBody && postBody]);

  return { fetchData, fetchIsPending, fetchError };
}

export default useFetch;
