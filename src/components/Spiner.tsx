import { Center, CenterProps, CircularProgress } from '@chakra-ui/react';

import { memo, useEffect, useState } from 'react';

interface Props extends CenterProps {}

function Spiner({ ...rest }: Props) {
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
      {...rest}
    >
      {isLoading && (
        <CircularProgress
          isIndeterminate
          color="grayDark"
          trackColor="tranparent"
          size="def"
          display={isLoading ? 'inline-block' : 'none'}
        />
      )}
    </Center>
  );
}

export default memo(Spiner);
