import { Center, CircularProgress } from '@chakra-ui/react';

import { memo, useEffect, useState } from 'react';

function Spiner() {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  }, []);

  return (
    <Center
      height="100vh"
      width="100vw"
      bg="white"
      position="fixed"
      top="0"
      left="0"
      zIndex="20"
      display={isLoading ? 'flex' : 'none'}
    >
      {isLoading && (
        <CircularProgress
          isIndeterminate
          color="black"
          size="def"
          display={isLoading ? 'inline-block' : 'none'}
        />
      )}
    </Center>
  );
}

export default memo(Spiner);
