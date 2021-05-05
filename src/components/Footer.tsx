import { Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

import { MdMailOutline } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

import React, { memo } from 'react';

function Footer() {
  return (
    <Flex
      bg="offWhite"
      flexDir="column"
      paddingX={['2rem', '2.5rem', '5rem', '7.5rem', '15rem']}
      paddingY="2.5rem"
    >
      <Heading as="h2" fontSize="md" color="grayDark" textTransform="uppercase">
        Contato
      </Heading>
      <Stack
        listStyleType="none"
        color="grayText"
        spacing=".75rem"
        marginY="1.75rem"
        fontWeight="400"
      >
        <Link
          _hover={{ color: 'red', textDecoration: 'underline' }}
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
          _hover={{ color: 'red', textDecoration: 'underline' }}
          display="flex"
          alignItems="center"
        >
          <Text as={MdMailOutline} fontSize="1.25rem" marginRight="1rem" />
          <Text fontSize="1.25ree">pjferragens@gmail.com</Text>
        </Link>
      </Stack>
      <Link
        fontSize=".875rem"
        href="mailto:contato.mths@outlook.com"
        _hover={{ color: 'red', textDecoration: 'underline' }}
      >
        Copyright &copy; 2021 | PJ ferragens | Todos os direitos reservados.
      </Link>
    </Flex>
  );
}

export default memo(Footer);
