import { Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

import { MdMailOutline } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

import React, { memo } from 'react';

function Footer() {
  return (
    <Flex
      bg="offWhite"
      flexDir="column"
      paddingX={['2rem', '2.5rem', '5rem', '7.5rem', '15rem']}
      paddingY="3rem"
      color="grayText"
    >
      <Heading
        as="h2"
        fontSize={['2rem', '2rem', 'md']}
        color="grayDark"
        textTransform="uppercase"
      >
        Contato
      </Heading>
      <Stack
        listStyleType="none"
        color="grayText"
        spacing=".75rem"
        marginY="1.5rem"
        fontWeight="400"
      >
        <Link
          _active={{}}
          _focus={{}}
          _hover={{ color: 'red', textDecoration: 'underline' }}
          _visited={{ color: 'black', _hover: { color: 'red' } }}
          width="fit-content"
          display="flex"
          target="_blank"
          alignItems="center"
          href="https://api.whatsapp.com/send?phone=55313453-6384"
        >
          <Text as={FaWhatsapp} fontSize="1.25rem" marginRight="1rem" />
          <Text>(31) 3453-6384</Text>
        </Link>

        <Link
          href="mailto:pjferragens@gmail.com"
          target="_blank"
          _active={{}}
          _focus={{}}
          _hover={{ color: 'red', textDecoration: 'underline' }}
          _visited={{ color: 'black', _hover: { color: 'red' } }}
          width="fit-content"
          display="flex"
          alignItems="center"
        >
          <Text as={MdMailOutline} fontSize="1.25rem" marginRight="1rem" />
          <Text fontSize="1.25ree">pjferragens@gmail.com</Text>
        </Link>
        <Link
          _active={{}}
          _focus={{}}
          _hover={{ color: 'red', textDecoration: 'underline' }}
          _visited={{ color: 'black', _hover: { color: 'red' } }}
          width="fit-content"
          display="flex"
          fontSize="sm"
          target="_blank"
          href="https://www.google.com/maps/place/R.+Rosa+Zandona,+128+-+Venda+Nova,+Belo+Horizonte+-+MG,+31510-050/@-19.8165118,-43.9612814,17z/data=!4m13!1m7!3m6!1s0xa68fe9b214955f:0xc5f783f0dc1c1e9d!2sR.+Rosa+Zandona,+128+-+Venda+Nova,+Belo+Horizonte+-+MG,+31510-050!3b1!8m2!3d-19.8164447!4d-43.9613243!3m4!1s0xa68fe9b214955f:0xc5f783f0dc1c1e9d!8m2!3d-19.8164447!4d-43.9613243"
        >
          <Text
            as={FiMapPin}
            fontSize="1.25rem"
            marginRight="1rem"
            flexShrink={0}
          />
          <Text>
            R. Rosa Zandona, 128 - Venda Nova, Belo Horizonte - MG, 31510-050
          </Text>
        </Link>
      </Stack>
      <Link
        fontSize=".875rem"
        href="mailto:contato.mths@outlook.com"
        _visited={{ color: 'black', _hover: { color: 'red' } }}
        _active={{}}
        _hover={{ color: 'red', textDecoration: 'underline' }}
        _focus={{}}
        width="fit-content"
      >
        Copyright &copy; 2021 | PJ ferragens | Todos os direitos reservados.
      </Link>
    </Flex>
  );
}

export default memo(Footer);
