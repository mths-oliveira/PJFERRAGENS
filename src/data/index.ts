import fechaduras from './fechaduras.json';
import geral from './geral.json';
import janelas from './janelas.json';
import moveis from './moveis.json';
import portas from './portas.json';
import utilidades from './utilidades.json';

type QueryId = string | string[] | undefined;

type Key =
  | 'fechaduras'
  | 'geral'
  | 'janelas'
  | 'moveis'
  | 'portas'
  | 'utilidades';

const keys = [
  'fechaduras',
  'geral',
  'janelas',
  'moveis',
  'portas',
  'utilidades',
];

const sections = {
  fechaduras,
  geral,
  janelas,
  moveis,
  portas,
  utilidades,
};

export function getItemsById(id: QueryId) {
  if (typeof id === 'string' && keys.includes(id)) {
    return sections[id as Key];
  }

  return geral;
}
