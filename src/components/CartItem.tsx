import { FaTrash } from 'react-icons/fa';

import {
  Box,
  Center,
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from '@chakra-ui/react';

import { CartItens, useCart } from '../context/cart';
import { memo, useCallback } from 'react';

function CartItem({ description, id, src, amount, details }: CartItens) {
  const { cartList, setCartList } = useCart();

  const handleTrash = useCallback(
    (value: string) => {
      const listFiltered = cartList.filter(({ id }) => id !== value);

      setCartList(listFiltered);
    },
    [cartList]
  );

  const handleInputChange = useCallback(
    (id: string, value: string) => {
      const newCart = cartList.map((item) => {
        if (item.id === id) {
          item.amount = value;
        }

        return item;
      });

      setCartList(newCart);
    },
    [cartList]
  );

  return (
    <Flex>
      <Box
        position="relative"
        marginX=".75rem"
        flexShrink={0}
        width="6.75rem"
        height="5.75rem"
      >
        <Image
          src={src}
          width="100%"
          height="100%"
          objectFit="contain"
          transition=".2s ease"
          margin="auto"
        />
      </Box>

      <Flex flexDir="column">
        <Flex
          maxHeight="5.75rem"
          overflowY="auto"
          marginRight=".75rem"
          flexDir="column"
        >
          <Box
            flex={1}
            overflowY="auto"
            __css={{
              '&::-webkit-scrollbar': {
                width: '0',
              },
            }}
          >
            <Text color="grayText" fontSize="1rem">
              {description}
            </Text>
          </Box>
          {details && (
            <Text
              color="grayDark"
              fontSize=".875rem"
              fontWeight="bold"
              display="block"
              flexShrink={0}
            >
              {details}
            </Text>
          )}
        </Flex>

        <Flex
          marginTop="1rem"
          marginRight="1rem"
          justifyContent="space-between"
          color="black"
        >
          <Stack>
            <Text>Referência</Text>
            <Text
              fontSize="1rem"
              padding=".5rem .75rem"
              color="black"
              textAlign="center"
              border="1px solid #282828"
              bg="white"
              borderRadius="sm"
              fontWeight="700"
            >
              {id}
            </Text>
          </Stack>
          <Stack>
            <Text>Quantidade</Text>
            <NumberInput
              size="md"
              max={99}
              min={1}
              defaultValue={amount}
              display="flex"
              onChange={(value) => {
                handleInputChange(id, value);
              }}
            >
              <Center
                paddingRight=".75rem"
                fontSize="1rem"
                fontWeight="700"
                transition=".2s ease"
                cursor="pointer"
                color="grayDark"
                _hover={{ color: 'red' }}
                onClick={() => handleTrash(id)}
              >
                <FaTrash />
              </Center>
              <NumberInputField
                fontSize="1rem"
                fontWeight="700"
                paddingX=".75rem"
                width="4.5rem"
                transition=".2s ease"
                _hover={{ boxShadow: 'sm' }}
                _active={{ boxShadow: 'sm' }}
                _focus={{ boxShadow: 'sm' }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper fontSize=".75rem" />
                <NumberDecrementStepper fontSize=".75rem" />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default memo(CartItem);
