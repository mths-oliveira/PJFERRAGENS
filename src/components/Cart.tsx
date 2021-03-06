import {
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { MdShoppingCart } from 'react-icons/md';

import { memo, useCallback, useEffect, useState } from 'react';

import { CartItens } from '../context/cart';
import CartItem from './CartItem';
import Cookies from 'js-cookie';
import Form from './Form';

interface UseCart {
  cartList: CartItens[];
  setCartList: (cart: CartItens[]) => void;
  cartLength: number;
  setCartLength: (num: number) => void;
}

function Cart({ cartList, setCartList, cartLength, setCartLength }: UseCart) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearCart = useCallback(() => {
    setCartList([]);

    onClose();
  }, []);

  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cartList));

    if (cartList.length === cartLength) return;

    setCartLength(cartList.length);

    if (isFirst) return;

    setTimeout(() => {
      onOpen();
    }, 500);
  }, [cartList, isFirst]);

  useEffect(() => {
    setTimeout(() => {
      setIsFirst(false);
    }, 500);
  }, []);

  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();

  const handleForm = useCallback(() => {
    onClose();

    setTimeout(() => {
      onOpenForm();
    }, 400);
  }, [isOpenForm]);

  return (
    <>
      <Form isOpen={isOpenForm} onClose={onCloseForm} onOpen={onOpenForm} />
      <Center
        as="button"
        height="2.5rem"
        width="2.5rem"
        onClick={onOpen}
        position="relative"
        _before={{
          position: 'absolute',
          top: '25%',
          right: '-1rem',
          paddingX: '.25rem',
          fontSize: '.875rem',
          bg: 'red',
          color: 'white',
          content: cartLength > 9 ? `'${cartLength}'` : `'0${cartLength}'`,
          borderRadius: 'sm',
        }}
      >
        <MdShoppingCart fontSize="1.25rem" />
      </Center>
      <Modal
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
          maxHeight="calc(100vh - 4rem)"
          height="fit-content"
          boxShadow="none"
        >
          <ModalCloseButton
            _focus={{}}
            _active={{}}
            _hover={{}}
            size="md"
            bg="white"
            zIndex="1000"
          />
          <ModalBody padding="0" id="card" bg="white">
            <Stack margin="3rem 0 1.5rem" spacing="2rem">
              {cartList.length > 0 ? (
                cartList.map((cart, i) => <CartItem {...cart} key={i + 100} />)
              ) : (
                <Text
                  display="block"
                  textAlign="center"
                  marginY="3rem"
                  fontSize="1.5rem"
                  color="garyDark"
                >
                  Carrinho vazio!
                </Text>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter padding="1rem">
            <Flex
              fontSize="0.75rem"
              justifyContent="space-between"
              width="100%"
            >
              <Button
                fontSize=".75rem"
                _active={{}}
                _hover={{ boxShadow: 'sm' }}
                _focus={{}}
                borderRadius="sm"
                padding=".5rem .75rem"
                boxShadow="line"
                bg="white"
                color="grayDark"
                textTransform="uppercase"
                fontWeight="700"
                onClick={clearCart}
                disabled={cartList.length <= 0}
              >
                limpar carrinho
              </Button>
              <Button
                fontSize=".75rem"
                _active={{}}
                _focus={{}}
                borderRadius="sm"
                padding=".75rem 1rem"
                bg="grayDark"
                color="white"
                textTransform="uppercase"
                fontWeight="700"
                onClick={handleForm}
                transition=".2s ease"
                disabled={cartList.length <= 0}
                _hover={{ bg: 'red' }}
              >
                Solicitar or??amento
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default memo(Cart);
