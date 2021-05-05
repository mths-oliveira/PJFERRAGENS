import { Flex, Grid, Heading, Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

import Navbar from '../components/Navbar';
import Wraper from '../components/Wraper';
import Footer from '../components/Footer';
import Spiner from '../components/Spiner';

interface Pages {
  url: string;
  title: string;
  srcImage: string;
}

const pages: Pages[] = [
  {
    url: '/ferragens/fechaduras',
    title: 'Fechaduras e acessórios',
    srcImage: '/macaneta.jpg',
  },
  {
    url: '/ferragens/geral',
    title: 'Ferragens em geral',
    srcImage: '/parafuso.jpeg',
  },
  {
    url: '/ferragens/janelas',
    title: 'Ferragens para janelas',
    srcImage: '/janela.jpeg',
  },
  {
    url: '/ferragens/portas',
    title: 'Ferragens para portas',
    srcImage: '/dobradica.jpg',
  },

  {
    url: '/ferragens/moveis ',
    title: 'Peças para móveis',
    srcImage: '/dobradica2.jpg',
  },
  {
    url: '/ferragens/utilidades',
    title: 'Utilidades domésticas',
    srcImage: 'cabide.jpg',
  },
];

function App() {
  const { push } = useRouter();

  return (
    <Wraper>
      <Navbar />
      <Flex
        flexDir="column"
        marginTop="3.5rem"
        flex={1}
        paddingX={['1rem', '2.5rem', '5rem', '7.5rem', '15rem']}
      >
        <Heading
          as="h1"
          fontSize="md"
          color="garyDark"
          margin="2.5rem auto"
          textAlign="center"
          textTransform="uppercase"
        >
          Categorias em ferragens
        </Heading>
        <Grid
          marginBottom={['1rem', '2.5rem', '3.5rem']}
          gridTemplateColumns={[
            'repeat(1, minmax(17.5rem, 1fr))',
            'repeat(2, minmax(17.5rem, 1fr))',
            'repeat(2, minmax(17.5rem, 1fr))',
            'repeat(3, minmax(17.5rem, 1fr))',
          ]}
          gap=".5rem"
          alignItems="center"
          justifyContent="center"
        >
          {pages.map(({ srcImage, title, url }) => (
            <Link
              key={srcImage}
              position="relative"
              onClick={() => {
                push(url);
              }}
            >
              <Image
                src={srcImage}
                width="100%"
                borderRadius="sm"
                transition=".2s ease"
                filter="brightness(75%)"
                _hover={{ filter: 'brightness(100%)' }}
              />
              <Heading
                as="h3"
                color="white"
                fontSize="sm"
                textTransform="uppercase"
                position="absolute"
                bottom="1rem"
                left="1rem"
              >
                {title}
              </Heading>
            </Link>
          ))}
        </Grid>
      </Flex>
      <Footer />
      <Spiner />
    </Wraper>
  );
}
export default App;
