import React, { memo } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { FaWhatsapp } from 'react-icons/fa';
import { MdMailOutline, MdMenu } from 'react-icons/md';

const sections = [
  {
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
      { subtitle: 'utilidades domésticas', url: '/ferragens/utilidades' },
    ],
  },
  {
    title: 'Sobre nós',
    topics: [
      { subtitle: 'Missão', url: '/sobre#' },
      { subtitle: 'Visão', url: '/sobre#visao' },
      { subtitle: 'Valores', url: '/sobre#valores' },
    ],
  },
  {
    title: 'Contato',
    topics: [
      {
        subtitle: 'pjferragens@gmail.com',
        url: 'mailto:pjferragens@gmail.com',
      },
      {
        subtitle: '(31) 3453-6384',
        url: 'https://api.whatsapp.com/send?phone=55313453-6384',
      },
    ],
  },
];

interface Props {}

function Navbar({}: Props) {
  const { push } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex height="3.5rem" widht="100%">
        <Flex
          width={['100vw', '100vw', 'calc(100% - .875rem)']}
          bg="offWhite"
          height="3.5rem"
          padding=".5rem"
          alignItems="center"
          justifyContent="space-between"
          position="fixed"
          top="0"
          left="0"
          zIndex="10"
        >
          <Center as="button" height="2.5rem" width="2.5rem" onClick={onOpen}>
            <MdMenu fontSize="1.5rem" />
          </Center>
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
              <Accordion defaultIndex={0}>
                {sections.map(({ title, topics }) => (
                  <AccordionItem key={title}>
                    <AccordionButton
                      _hover={{ bg: 'rgba(0,0,0,.1)' }}
                      _active={{ bg: 'rgba(0,0,0,.1)' }}
                      _focus={{ bg: 'rgba(0,0,0,.1)' }}
                      padding=".75rem 1rem"
                    >
                      <Box flex="1" textAlign="left">
                        {title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel as="ul" pb={4} listStyleType="none">
                      {topics.map(({ subtitle, url }) =>
                        title !== 'Contato' ? (
                          <Text
                            as="li"
                            key={subtitle}
                            padding=".75rem"
                            _hover={{
                              color: 'red',
                              textDecoration: 'underline',
                            }}
                            cursor="pointer"
                            onClick={() => {
                              onClose();
                              push(url);
                            }}
                          >
                            {subtitle}
                          </Text>
                        ) : (
                          <Text
                            as="a"
                            target="_blank"
                            key={subtitle}
                            paddingY=".75rem"
                            _hover={{
                              color: 'red',
                              textDecoration: 'underline',
                            }}
                            cursor="pointer"
                            href={url}
                            display="flex"
                            alignItems="center"
                          >
                            {subtitle === 'pjferragens@gmail.com' ? (
                              <Text
                                as={MdMailOutline}
                                fontSize="1.25rem"
                                marginRight="1rem"
                              />
                            ) : (
                              <Text
                                as={FaWhatsapp}
                                fontSize="1.25rem"
                                marginRight="1rem"
                              />
                            )}
                            <Text fontSize="1.25ree">{subtitle}</Text>
                          </Text>
                        )
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default memo(Navbar);
