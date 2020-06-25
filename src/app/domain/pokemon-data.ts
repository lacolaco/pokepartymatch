export interface PokemonData {
  idx: string;
  name: {
    eng: string;
    jpn: string;
    jpn_ro: string;
  };
  slug: {
    eng: string;
    jpn: string;
    jpn_ro: string;
  };
  'gen-7': {
    forms: {
      $: object;
      [key: string]: object;
    };
  };
  'gen-8': {
    forms: {
      $: object;
      [key: string]: object;
    };
  };
}
