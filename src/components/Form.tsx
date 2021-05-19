import {
  Box,
  Button,
  Center,
  CircularProgress,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  MdCheck,
  MdClose,
  MdMail,
  MdPeople,
  MdRefresh,
  MdThumbUp,
} from 'react-icons/md';
import { CartItens, useCart } from '../context/cart';

export interface Email {
  name: string;
  email: string;
  cartList: CartItens[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

type FormState = 'Loading' | 'ShowForm' | 'Success' | 'Failed';

function Form({ onClose, isOpen }: Props) {
  const { cartList } = useCart();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const [currentState, setCurrentState] = useState<FormState>('Loading');

  const handleStateChange = useCallback((newState: FormState) => {
    setCurrentState('Loading');

    if (newState === 'Loading') return;

    setTimeout(() => {
      setCurrentState(newState);
    }, 2000);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!email || !name) {
      return handleStateChange('ShowForm');
    }

    sendMail({ email, name, cartList });

    return handleStateChange('Loading');
  }, [name, email, cartList]);

  const sendMail = useCallback(async (dataMail: Email) => {
    try {
      const body = JSON.stringify(dataMail);

      const response = await fetch('../api/mail', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body,
      });

      response.status === 200
        ? handleStateChange('Success')
        : handleStateChange('Failed');
    } catch (_) {
      handleStateChange('Failed');
    }
  }, []);

  useEffect(() => {
    handleStateChange('ShowForm');
    setIsDisabled(true);
  }, [isOpen]);

  useEffect(() => {
    if (name && email) {
      return setIsDisabled(false);
    }

    setIsDisabled(true);
  }, [name, email]);

  return (
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
        maxHeight={['100vh', '100vh', 'calc(100vh - 4rem)']}
        height="fit-content"
        boxShadow="none"
        padding="3rem 2rem"
        bg="white"
      >
        <ModalBody padding="0" overflow="visible">
          {currentState === 'Loading' && (
            <Center
              widht="100%"
              height="100%"
              bg="white"
              overflow="hidden"
              padding="4rem 2rem"
            >
              <CircularProgress
                isIndeterminate
                color="grayDark"
                trackColor="tranparent"
                size="def"
              />
            </Center>
          )}
          {currentState === 'ShowForm' && (
            <>
              <ModalHeader padding="0">
                <Heading as="h3" fontSize="1.25rem" fontWeight="400">
                  Você receberá o seu orçamento por e-mail, para isso, preencha
                  os campos a seguir:
                </Heading>
              </ModalHeader>
              <ModalBody
                as="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                padding="0"
                overflow="visible"
                marginTop="2rem"
                onKeyDown={({ key }) => {
                  if (key === 'Enter' && inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <Stack spacing="1rem">
                  <InputGroup size="lg">
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <MdPeople color="gray.300" fontSize="1.25rem" />
                      }
                    />
                    <Input
                      required={true}
                      fontSize="1rem"
                      placeholder="Nome"
                      _placeholder={{ fontSize: '1rem' }}
                      border="none"
                      boxShadow="line"
                      _focus={{ boxShadow: 'sm' }}
                      onChange={({ currentTarget }) => {
                        setName(currentTarget.value);
                      }}
                    />
                  </InputGroup>

                  <InputGroup size="lg">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdMail color="gray.300" fontSize="1.25rem" />}
                    />
                    <Input
                      type="email"
                      required={true}
                      fontSize="1rem"
                      _placeholder={{ fontSize: '1rem' }}
                      placeholder="E-mail"
                      border="none"
                      boxShadow="line"
                      _focus={{ boxShadow: 'sm' }}
                      onChange={({ currentTarget }) => {
                        setEmail(currentTarget.value);
                      }}
                      ref={inputRef}
                    />
                  </InputGroup>
                </Stack>
                <ModalFooter
                  marginTop="2rem"
                  overflow="visible"
                  padding="0"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    width="calc(50% - .5rem)"
                    padding=".75rem"
                    color="grayDark"
                    fontSize=".875rem"
                    fontWeight="bold"
                    textAlign="center"
                    textTransform="uppercase"
                    borderRadius="sm"
                    transition=".2s ease"
                    bg="white"
                    boxShadow="line"
                    _hover={{ boxShadow: 'sm' }}
                    disabled={isDisabled ? true : undefined}
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    width="calc(50% - .5rem)"
                    padding=".75rem"
                    bg="grayDark"
                    color="white"
                    fontSize=".875rem"
                    fontWeight="bold"
                    textAlign="center"
                    textTransform="uppercase"
                    borderRadius="sm"
                    transition=".2s ease"
                    _hover={{ bg: 'red' }}
                    disabled={isDisabled ? true : undefined}
                    _focus={{}}
                  >
                    Enviar
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
          {currentState === 'Success' && (
            <>
              <ModalCloseButton />
              <Stack alignItems="center" textAlign="center" spacing="1rem">
                <Box
                  padding=".5rem"
                  borderRadius="50%"
                  width="fit-content"
                  bg="green"
                >
                  <MdCheck fontSize="2.25rem" color="white" />
                </Box>
                <Text color="green" fontSize="2.25rem">
                  Sucesso!
                </Text>
                <Text
                  fontSize="1.25rem"
                  textAlign="center"
                  color="grayText"
                  paddingBottom="1.25rem"
                >
                  Em instantes, você receberá o seu orçamento por e-mail, por
                  favor verifique sua caixa de spam e outros filtros.
                </Text>

                <Button
                  color="white"
                  _active={{}}
                  _hover={{}}
                  bg="green"
                  fontSize="1.25rem"
                  display="flex"
                  padding="1.5rem 1rem"
                  onClick={onClose}
                >
                  <MdThumbUp fontSize="1.5rem" />
                  <Text marginLeft="1rem">Entendido</Text>
                </Button>
              </Stack>
            </>
          )}
          {currentState === 'Failed' && (
            <>
              <ModalCloseButton />
              <Stack alignItems="center" textAlign="center" spacing="1rem">
                <Box
                  padding=".5rem"
                  borderRadius="50%"
                  width="fit-content"
                  bg="red"
                >
                  <MdClose fontSize="2.25rem" color="white" />
                </Box>
                <Text color="red" fontSize="2.25rem">
                  Oops...
                </Text>

                <Text
                  fontSize="1.25rem"
                  textAlign="center"
                  color="grayText"
                  paddingBottom="1.25rem"
                >
                  Estamos enfrentando problemas para enviar seu pedido de
                  orçamento, tente reenviar novamente.
                </Text>
                <Button
                  color="white"
                  _active={{}}
                  _hover={{}}
                  bg="red"
                  fontSize="1.25rem"
                  display="flex"
                  padding="1.5rem 1rem"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <MdRefresh fontSize="1.5rem" />
                  <Text marginLeft="1rem">Tentar novamente</Text>
                </Button>
              </Stack>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default memo(Form);
