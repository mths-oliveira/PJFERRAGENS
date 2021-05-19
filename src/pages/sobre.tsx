import { Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Spiner from '../components/Spiner';

function Sobre() {
  return (
    <Flex
      flexDir="column"
      minHeight="100vh"
      justifyContent="space-between"
      paddingTop={['3.5rem', '3.5rem', '0']}
    >
      <Navbar />

      <Grid
        gridTemplateColumns="repeat(1, minmax(17.5rem, 1fr))"
        justifyContent="center"
        gap={['2.25rem', '2.25rem', '2.25rem']}
        marginY={['2rem', '2.25rem', '5rem']}
        marginX={['2rem', '2.25rem', '5rem', '7.5rem', '15rem']}
        color="grayText"
      >
        <Stack spacing=".5rem">
          <Heading
            as="h2"
            fontSize={['2rem', '2rem', 'md']}
            color="grayDark"
            id="missao"
          >
            Quem somos
          </Heading>
          <Text>
            Há mais de dez anos no mercado, nos destacamos por fornecer
            ferragens para portas e janelas, além de acessórios para o lar em
            kits personalizados que facilitam a instalação e execução de
            serviços.
          </Text>
        </Stack>
        <Stack spacing=".5rem">
          <Heading
            as="h2"
            fontSize={['2rem', '2rem', 'md']}
            color="grayDark"
            id="missao"
          >
            Missão
          </Heading>
          <Text>
            Comercializar produtos práticos e de qualidade aos nosso clientes
            que proporcionem agilidade em serviços e instalações garantindo a
            satisfação do consumidor final.
          </Text>
        </Stack>
        <Stack spacing=".5rem" id="visao">
          <Heading as="h2" fontSize={['2rem', '2rem', 'md']} color="grayDark">
            Visão
          </Heading>
          <Text>
            Expandir nossa oferta de produtos em variedade e qualidade.
          </Text>
        </Stack>
        <Stack
          spacing=".5rem"
          id="valores"
          paddingBottom={['1rem', '1rem', '0']}
        >
          <Heading as="h2" fontSize={['2rem', '2rem', 'md']} color="grayDark">
            Valores
          </Heading>
          <Text>
            Garantir a satisfação de nosso clientes com atendimento diferenciado
            com preço competitivo.
          </Text>
        </Stack>
      </Grid>
      <Footer />
      <Spiner />
    </Flex>
  );
}

export default Sobre;
