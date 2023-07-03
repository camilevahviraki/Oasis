import { useEffect, useState } from 'react';

const Delay = (props) => {
  const [response, setResponse] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setResponse(true);
    }, 3000);
  }, []);

  return response;
};

export default Delay;
