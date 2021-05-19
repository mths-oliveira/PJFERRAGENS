import { Flex, Grid, Heading, Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

import Navbar from '../components/Navbar';
import Wraper from '../components/Wraper';
import Footer from '../components/Footer';
import Spiner from '../components/Spiner';
import { useCallback, useEffect, useRef, useState } from 'react';

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

  const heroRef = useRef<HTMLDivElement>(null);

  const [isHidden, setIsHidden] = useState(true);

  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;

    const { height, top } = heroRef.current.getBoundingClientRect();

    const navbarHeight = 56;

    const visibleHeight = height + top;

    setIsHidden(visibleHeight > navbarHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <Wraper onScroll={handleScroll}>
      <Navbar top={isHidden ? '-3.5rem' : '0'} />
      <Flex
        bg="red"
        height="fit-content"
        paddingX={['0', '2.5rem', '5rem', '7.5rem', '15rem']}
        ref={heroRef}
      >
        <Image src="/logo.jpg" />
      </Flex>
      <Flex
        flex={1}
        flexDir="column"
        paddingX={['1rem', '2.5rem', '5rem', '7.5rem', '15rem']}
      >
        <Heading
          as="h1"
          fontSize={['2rem', '2rem', 'md']}
          color="grayDark"
          margin={['2.25rem 0 1rem', '3rem 0 1rem', '6.75rem 0 2.25rem']}
          textTransform="uppercase"
          textAlign={['center', 'center', 'left']}
        >
          Categorias em ferragens
        </Heading>
        <Grid
          marginBottom={['1rem', '2.5rem', '6rem']}
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
