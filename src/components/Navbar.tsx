import React, { memo, useState } from 'react';

import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FlexProps,
  Image,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MdMenu, MdKeyboardArrowDown } from 'react-icons/md';
import Cart from './Cart';

const products = {
  title: 'Produtos',
  topics: [
    {
      subtitle: 'Fechaduras e acessórios',
      url: '/ferragens/fechaduras',
    },
    { subtitle: 'Ferragens em geral', url: '/ferragens/geral' },
    { subtitle: 'Ferragens para janelas', url: '/ferragens/janelas' },
    { subtitle: 'Ferragens para portas', url: '/ferragens/portas' },
    { subtitle: 'Peças para móveis', url: '/ferragens/moveis' },
    { subtitle: 'Utilidades domésticas', url: '/ferragens/utilidades' },
  ],
};

const about = {
  title: 'Sobre nós',
  url: '/sobre',
};

function Navbar({ ...rest }: FlexProps) {
  const { push } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isDropDonwOpen, setIsDropDonwOpen] = useState(true);

  return (
    <>
      <Flex height={['0', '0', '3.5rem']} widht="100%">
        <Flex
          width={['100vw', '100vw', 'calc(100% - .75rem)']}
          bg="offWhite"
          height="3.5rem"
          padding=".5rem"
          alignItems="center"
          justifyContent="space-between"
          position="fixed"
          top="0"
          left="0"
          zIndex="10"
          transition=".5s ease"
          {...rest}
        >
          <Flex>
            <Center as="button" height="2.5rem" width="2.5rem" onClick={onOpen}>
              <MdMenu fontSize="1.5rem" />
            </Center>
            <Cart />
          </Flex>

          <Center as="button" onClick={() => push('/')} height="2.5rem">
            <Image src="/logo.jpg" height="100%" />
          </Center>
        </Flex>
      </Flex>
      <Drawer placement="left" isOpen={isOpen} size="xs" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader padding=".75rem">
              <Image
                src="/logo.jpg"
                cursor="pointer"
                onClick={() => push('/')}
              />
            </DrawerHeader>
            <DrawerBody padding="0">
              <Flex
                flexDirection="column"
                as="ul"
                listStyleType="none"
                width="100%"
                overflow="hidden"
              >
                <Flex
                  as="li"
                  justifyContent="space-between"
                  alignItems="center"
                  border="1px solid rgba(0,0,0,.1)"
                >
                  <Text padding=".75rem 1rem">{products.title}</Text>
                  <Box
                    as="button"
                    padding=".75rem 1rem"
                    onClick={() => setIsDropDonwOpen(!isDropDonwOpen)}
                    transform={
                      isDropDonwOpen ? 'rotate(-180deg)' : 'rotate(0deg)'
                    }
                    _hover={{ color: 'red' }}
                    transition="transform .3s ease"
                  >
                    <MdKeyboardArrowDown fontSize="1.25rem" />
                  </Box>
                </Flex>

                <Box
                  as="li"
                  transition=".3s ease"
                  paddingY={isDropDonwOpen ? '.75rem' : '0'}
                  height={isDropDonwOpen ? 'inherit' : '0'}
                  overflow="hidden"
                >
                  {products.topics.map(({ subtitle, url }, i) => (
                    <Link
                      key={`${url}_${i}`}
                      src={url}
                      onClick={() => {
                        push('/');
                        setTimeout(() => {
                          push(url);
                        }, 200);
                      }}
                      padding=".75rem 1.5rem"
                      width="100%"
                      display="block"
                      _hover={{ color: 'red', textDecoration: 'underline' }}
                    >
                      {subtitle}
                    </Link>
                  ))}
                </Box>
              </Flex>
              <Link
                src={about.url}
                onClick={() => push(about.url)}
                border="1px solid rgba(0,0,0,.1)"
                borderTop={isDropDonwOpen ? '1px solid rgba(0,0,0,.1)' : 'none'}
                padding=".75rem 1rem"
                widht="100%"
                display="block"
                _hover={{ color: 'red', textDecoration: 'underline' }}
              >
                {about.title}
              </Link>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default memo(Navbar);
