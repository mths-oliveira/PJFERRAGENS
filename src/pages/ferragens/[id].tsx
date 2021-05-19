import { useRouter } from 'next/router';

import { memo, useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';

import { getItemsById } from '../../data';

import { sortProducts, makeSectionTitle, groupBy, Product } from '../../utils';

import Wraper from '../../components/Wraper';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Spiner from '../../components/Spiner';
import Card from '../../components/Card';
import CardSlider from '../../components/CardSlider';
import { useCart } from '../../context/cart';

function Ferragens() {
  const { query } = useRouter();

  const [sectionTitles, setSectionTitles] = useState<string[]>([]);

  const [sectionItems, setSectionItems] = useState<Product[][]>([]);

  const { setCartList, cartList } = useCart();

  useEffect(() => {
    const { ferragens, list } = getItemsById(query.id);

    const sortedProducts = sortProducts(ferragens);

    const sectionItems = groupBy(sortedProducts, list);

    setSectionItems(sectionItems);

    const sectionTitles = makeSectionTitle(list);

    setSectionTitles(sectionTitles);
  }, [query.id]);

  return (
    <Wraper paddingTop={['2.25rem', '2.25rem', '4.5rem']}>
      <Navbar />
      <Stack
        spacing={['1rem', '1rem', '4.5rem']}
        paddingY="3.5rem"
        paddingBottom={['1.5rem', '1.5rem', '3.5rem']}
      >
        {sectionTitles.map((title, i) => (
          <CardSlider title={title} key={`${query.id}_${i}`}>
            {sectionItems[i].map(({ ...rest }, i) => (
              <Card
                {...rest}
                key={`${rest.src}_${i}`}
                cartList={cartList}
                setCartList={setCartList}
              />
            ))}
          </CardSlider>
        ))}
      </Stack>
      <Footer />
      <Spiner />
    </Wraper>
  );
}

export default memo(Ferragens);
