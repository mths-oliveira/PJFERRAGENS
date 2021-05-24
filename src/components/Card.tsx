import {
  Box,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { memo, useCallback, useState } from 'react';

import { MdArrowForward, MdKeyboardArrowUp } from 'react-icons/md';
import { FaCartPlus } from 'react-icons/fa';

import { CartItens } from '../context/cart';

interface Props {
  description: string;
  src: string;
  details?: string[];
  id?: string;
  ids?: string[];
  cartList: CartItens[];
  setCartList: (cart: CartItens[]) => void;
}

function Card({
  src,
  description,
  ids,
  id,
  details,
  cartList,
  setCartList,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCartList = useCallback(
    (item: CartItens) => {
      onClose();

      for (const { id } of cartList) {
        if (item.id === id) return;
      }

      setCartList([...cartList, item]);
    },
    [cartList]
  );

  const [isHidden, setIsHidden] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = useCallback(
    (target: EventTarget & HTMLParagraphElement) => {
      const index = target.getAttribute('data-index');

      if (!index) return;

      setIsHidden(true);

      setCurrentIndex(Number(index));
    },
    []
  );

  return (
    <Flex
      width="13.75rem"
      height="20.625rem"
      flexDir="column"
      flexShrink={0}
      boxShadow="line"
      transition=".2s ease"
      padding="1rem 1.25rem"
      cursor="pointer"
      borderRadius="sm"
      onClick={onOpen}
      _hover={{ boxShadow: 'sm' }}
    >
      <Box flex={1} height="50%" bg="white">
        <Image
          src={src}
          width="100%"
          height="100%"
          objectFit="contain"
          _hover={{ transform: 'scale(1.1)' }}
          transition=".2s ease"
        />
      </Box>
      <Flex
        height="50%"
        flexDir="column"
        flex={1}
        justifyContent="space-between"
      >
        <Text
          marginY="1.125rem"
          cursor="text"
          color="grayText"
          overflow="auto"
          maxHeight="6.75rem"
          display="block"
          id="scrollNone"
        >
          {description}
        </Text>

        <Flex
          as="button"
          fontSize=".75rem"
          textTransform="uppercase"
          fontWeight="bold"
          justifyContent="space-between"
          _hover={{ color: 'red', textDecoration: 'underline' }}
          color="grayDark"
        >
          <Text>Detalhes do produto</Text>
          <Text as={MdArrowForward} fontSize="1rem" />
        </Flex>
      </Flex>
      <Modal
        id="card"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="md"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          maxWidth="22.5rem"
          margin="0"
          maxHeight={['100vh', '100vh', 'calc(100vh - 4rem)']}
          height="fit-content"
          boxShadow="none"
        >
          <ModalCloseButton _focus={{}} _active={{}} _hover={{}} size="md" />
          <ModalBody padding="0" overflow="visible">
            <Center height="20rem">
              <Image
                src={src}
                objectFit="contain"
                width="calc(100% - 4rem)"
                maxHeight="calc(100% - 4rem)"
              />
            </Center>
            <Stack padding="0 1.5rem 1.5rem" spacing="1.5rem" flex={1}>
              <Text fontSize="1.125rem" color="grayText">
                {description}
              </Text>

              <Stack spacing="1rem">
                {ids && details ? (
                  <Flex flexDir="column" position="relative">
                    <Flex
                      as="button"
                      alignItems="center"
                      justifyContent="space-between"
                      borderBottom="2px solid rgba(0,0,0,.1)"
                      transition=".2s ease"
                      _hover={{ borderBottom: '2px solid #282828' }}
                      onClick={() => setIsHidden(!isHidden)}
                    >
                      <Text
                        paddingBottom=".5rem"
                        fontSize=".875rem"
                        fontWeight="bold"
                        color="grayDark"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {details[currentIndex]}
                      </Text>
                      <Box paddingX=".75rem" fontSize="1.25rem">
                        <MdKeyboardArrowUp />
                      </Box>
                    </Flex>

                    <Stack
                      width="100%"
                      bg="white"
                      spacing="0"
                      boxShadow="sm"
                      position="absolute"
                      borderRadius="sm"
                      overflow="hidden"
                      bottom="calc(100% + 1rem)"
                      left="0"
                      zIndex="1000"
                      transition=".2s ease"
                      opacity={isHidden ? 0 : 1}
                      pointerEvents={isHidden ? 'none' : 'initial'}
                      transform={isHidden ? 'scale(0.9)' : 'scale(1)'}
                    >
                      {details.map((text, i) => (
                        <Text
                          key={`${text[0]}_${i}`}
                          fontSize=".875rem"
                          fontWeight="bold"
                          color="grayDark"
                          padding=".75rem"
                          _hover={{ bg: 'rgba(0,0,0,.1)' }}
                          cursor="pointer"
                          transition=".2s ease"
                          data-index={i}
                          onClick={({ currentTarget }) =>
                            handleClick(currentTarget)
                          }
                        >
                          {text}
                        </Text>
                      ))}
                    </Stack>
                    <Stack
                      marginTop="1.5rem"
                      as="button"
                      bg="grayDark"
                      color="white"
                      direction="row"
                      alignItems="center"
                      padding=".75rem "
                      spacing=".75rem"
                      width="fit-content"
                      borderRadius="sm"
                      transition=".2s ease"
                      _hover={{ bg: 'red' }}
                      onClick={() => {
                        handleCartList({
                          id: ids[currentIndex],
                          src,
                          description,
                          amount: '1',
                          details: details[currentIndex],
                        });
                      }}
                    >
                      <FaCartPlus />
                      <Text fontSize=".75rem" textTransform="uppercase">
                        Adicionar ao carrinho
                      </Text>
                    </Stack>
                  </Flex>
                ) : (
                  <Stack
                    as="button"
                    bg="grayDark"
                    color="white"
                    direction="row"
                    alignItems="center"
                    padding=".75rem "
                    spacing=".75rem"
                    width="fit-content"
                    transition=".2s ease"
                    _hover={{ bg: 'red' }}
                    borderRadius="sm"
                    onClick={() => {
                      if (id) {
                        handleCartList({ id, src, description, amount: '1' });
                      }
                    }}
                  >
                    <FaCartPlus />
                    <Text fontSize=".75rem" textTransform="uppercase">
                      Adicionar ao carrinho
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default memo(Card);
