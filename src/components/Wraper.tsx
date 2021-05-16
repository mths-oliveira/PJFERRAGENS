import { Flex, FlexProps } from '@chakra-ui/react';

interface Props extends FlexProps {}

function Wraper({ children, ...rest }: Props) {
  return (
    <Flex
      height="100vh"
      width={['100vw', '100vw', '100vw', 'calc(100vw - .15rem)']}
      flexDir="column"
      overflowX="hidden"
      overflowY="auto"
      {...rest}
    >
      {children}
    </Flex>
  );
}

export default Wraper;
