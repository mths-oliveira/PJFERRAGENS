export interface Product {
  id?: string;
  ids?: string[];
  src: string;
  details?: string[];
  description: string;
}

export function sortProducts(products: Product[]) {
  const productsSorted = products.sort((prev, curr) => {
    return prev.description > curr.description ? 1 : -1;
  });

  return productsSorted;
}

function concatenateWords(words: string[]) {
  const lastIndex = words.length - 1;

  const text = words.reduce((text, word, index) =>
    index !== lastIndex ? `${text}, ${word}` : `${text} e ${word}`
  );

  return text;
}

export function makeSectionTitle(sections: string[][]) {
  const sectionTitles = sections.map((productNames) =>
    concatenateWords(productNames)
  );

  return sectionTitles;
}

export function groupBy(products: Product[], parameters: string[][]) {
  const sectionItems = [];

  for (const param of parameters) {
    const filteredProducts = products.filter(({ description }) => {
      const words = description.split(' ');

      if (words[0] === 'Kit' || words[0] === 'Porta') {
        return param.includes(`${words[0]} ${words[1]}`);
      }

      return param.includes(words[0]);
    });

    sectionItems.push(filteredProducts);
  }

  return sectionItems;
}

const diasDaSemana = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const mesesDoAno = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function getDate() {
  const now = new Date();

  const weekDay = now.getDay();

  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const dateFormated = `${
    diasDaSemana[weekDay]
  }, <span style="white-space: nowrap;">${format(day)} de ${
    mesesDoAno[month]
  } de ${year}</span> <span style="white-space: nowrap;">as ${format(
    hours
  )}:${format(minutes)}</span>`;

  return dateFormated;
}

function format(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}
