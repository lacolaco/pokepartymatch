import * as fs from 'fs';
import * as path from 'path';
import { Pokemon } from '../src/app/domain/pokemon';

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
  'gen-8': {
    forms: {
      $: object;
      [key: string]: Record<string, any>;
    };
  };
}

const pokemonData: Record<string, PokemonData> = require('pokesprite-images/data/pokemon.json');

const pokemons: Pokemon[] = Object.entries(pokemonData)
  .map(([, data]) => {
    return Object.entries(data['gen-8'].forms)
      .filter(([form, formMeta]) => {
        if (formMeta['is_alias_of']) {
          return false;
        }
        // メガシンカ
        if (form.includes('mega')) {
          return false;
        }
        // ピカチュウ
        if (data.slug.eng === 'pikachu' && form !== '$') {
          return false;
        }
        // ピチュー
        if (data.slug.eng === 'pichu' && form !== '$') {
          return false;
        }
        // イーブイ
        if (data.slug.eng === 'eevee' && form !== '$') {
          return false;
        }
        // アンノーン
        if (data.slug.eng === 'unown' && form !== '$') {
          return false;
        }
        // パッチール
        if (data.slug.eng === 'spinda' && form !== '$') {
          return false;
        }
        // ポワルン
        if (data.slug.eng === 'castform' && form !== '$') {
          return false;
        }
        // デオキシス
        if (data.slug.eng === 'deoxys' && form !== '$') {
          return false;
        }
        // チェリム
        if (data.slug.eng === 'cherrim' && form === '$') {
          return false;
        }
        // カラナクシ・トリトドン
        if (['shellos', 'gastrodon'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ギラティナ
        if (data.slug.eng === 'giratina' && form !== '$') {
          return false;
        }
        // シェイミ
        if (data.slug.eng === 'shaymin' && form !== '$') {
          return false;
        }
        // アルセウス
        if (data.slug.eng === 'arceus' && form !== '$') {
          return false;
        }
        // バスラオ
        if (data.slug.eng === 'basculin' && form !== '$') {
          return false;
        }
        // シキジカ
        if (['sawsbuck', 'deerling'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ケルディオ・メロエッタ・ゲノセクト
        if (['keldeo', 'meloetta', 'genesect'].includes(data.slug.eng)) {
          return false;
        }
        // ゲッコウガ
        if (['greninja'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ビビヨン
        if (['scatterbug', 'spewpa', 'vivillon'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // フラージェス
        if (['flabebe', 'floette', 'florges'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // トリミアン
        if (['furfrou'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ギルガルド
        if (['aegislash'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // パンプジン
        if (['pumpkaboo', 'gourgeist'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ゼルネアス・イベルタル・ジガルデ
        if (['xerneas', 'yveltal', 'zygarde'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // フーパ
        if (['hoopa'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ヨワシ
        if (['wishiwashi'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // シルヴァディ
        if (['silvally'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // メテノ
        if (['minior'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // マギアナ
        if (['magearna'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ウッウ
        if (['cramorant'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // マホイップ
        if (['alcremie'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // コオリッポ
        if (['eiscue'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // モルペコ
        if (['morpeko'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ザシアン・ザマゼンタ・ムゲンダイナ
        if (['zacian', 'zamazenta', 'eternatus'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        // ザルード
        if (['zarude'].includes(data.slug.eng) && form !== '$') {
          return false;
        }
        return true;
      })
      .map(([form]) => {
        const slug = form === '$' ? data.slug.eng : `${data.slug.eng}-${form}`;

        // ミノムッチ系統
        if (data.slug.eng === 'burmy' || data.slug.eng === 'wormadam') {
          switch (form) {
            case '$': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（くさち）`,
                names: data.name,
              };
            }
            case 'sandy': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（すなち）`,
                names: data.name,
              };
            }
            case 'trash': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ゴミ）`,
                names: data.name,
              };
            }
          }
        }
        // ロトム系統
        if (data.slug.eng === 'rotom' && form !== '$') {
          switch (form) {
            case 'fan': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（スピン）`,
                names: data.name,
              };
            }
            case 'frost': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（フロスト）`,
                names: data.name,
              };
            }
            case 'heat': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ヒート）`,
                names: data.name,
              };
            }
            case 'mow': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（カット）`,
                names: data.name,
              };
            }
            case 'wash': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ウォッシュ）`,
                names: data.name,
              };
            }
          }
        }
        // ダルマッカ系統
        if (data.slug.eng === 'darmanitan' && form !== '$') {
          switch (form) {
            case 'zen': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ダルマ）`,
                names: data.name,
              };
            }
            case 'galar-zen': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ガラルダルマ）`,
                names: data.name,
              };
            }
          }
        }
        // 化身・霊獣系統
        if (['tornadus', 'thundurus', 'landorus'].includes(data.slug.eng)) {
          switch (form) {
            case '$': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（化身）`,
                names: data.name,
              };
            }
            case 'therian': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（霊獣）`,
                names: data.name,
              };
            }
          }
        }
        // キュレム
        if (data.slug.eng === 'kyurem') {
          switch (form) {
            case 'black': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ブラック）`,
                names: data.name,
              };
            }
            case 'white': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ホワイト）`,
                names: data.name,
              };
            }
          }
        }
        // オドリドリ
        if (data.slug.eng === 'oricorio') {
          switch (form) {
            case '$': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（めらめら）`,
                names: data.name,
              };
            }
            case 'pau': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ふらふら）`,
                names: data.name,
              };
            }
            case 'pom-pom': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ぱちぱち）`,
                names: data.name,
              };
            }
            case 'sensu': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（まいまい）`,
                names: data.name,
              };
            }
          }
        }
        // ルガルガン
        if (data.slug.eng === 'lycanroc') {
          switch (form) {
            case '$': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（まひる）`,
                names: data.name,
              };
            }
            case 'dusk': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（たそがれ）`,
                names: data.name,
              };
            }
            case 'midnight': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（まよなか）`,
                names: data.name,
              };
            }
          }
        }
        // ネクロズマ
        if (data.slug.eng === 'necrozma') {
          switch (form) {
            case '$': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}`,
                names: data.name,
              };
            }
            case 'dawn': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（日食）`,
                names: data.name,
              };
            }
            case 'dusk': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（月食）`,
                names: data.name,
              };
            }
            case 'ultra': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ウルトラ）`,
                names: data.name,
              };
            }
          }
        }
        // 性別による分岐
        if (['meowstic', 'indeedee'].includes(data.slug.eng)) {
          return [
            { form, slug, idx: data.idx, name_jpn: `${data.name.jpn}♂`, names: data.name },
            { form: `female`, slug: `female/${data.slug.eng}`, idx: data.idx, name_jpn: `${data.name.jpn}♀`, names: data.name },
          ];
        }
        // ストリンダー
        if (data.slug.eng === 'toxtricity') {
          switch (form) {
            case '$': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ハイ）`,
                names: data.name,
              };
            }
            case 'low-key': {
              return {
                form,
                slug,
                idx: data.idx,
                name_jpn: `${data.name.jpn}（ロー）`,
                names: data.name,
              };
            }
          }
        }
        // ウーラオス
        if (data.slug.eng === 'urshifu') {
          switch (form) {
            case '$': {
              return [
                {
                  form: 'single-strike',
                  slug: `${data.slug.eng}-gmax`,
                  idx: data.idx,
                  name_jpn: `${data.name.jpn}（いちげき）`,
                  names: data.name,
                },
                {
                  form: 'rapid-strike',
                  slug: `${data.slug.eng}-rapid-strike-gmax`,
                  idx: data.idx,
                  name_jpn: `${data.name.jpn}（れんげき）`,
                  names: data.name,
                },
              ];
            }
            default: {
              return [];
            }
          }
        }

        if (form === '$') {
          return {
            form,
            slug,
            idx: data.idx,
            name_jpn: data.name.jpn,
            names: data.name,
          };
        }
        if (form === 'gmax') {
          return {
            form,
            slug,
            idx: data.idx,
            name_jpn: `${data.name.jpn}（キョダイ）`,
            names: data.name,
          };
        }
        if (form === 'primal') {
          return {
            form,
            slug,
            idx: data.idx,
            name_jpn: `${data.name.jpn}（ゲンシ）`,
            names: data.name,
          };
        }
        if (form === 'galar') {
          return {
            form,
            slug,
            idx: data.idx,
            name_jpn: `${data.name.jpn}（ガラル）`,
            names: data.name,
          };
        }
        if (form === 'alola') {
          return {
            form,
            slug,
            idx: data.idx,
            name_jpn: `${data.name.jpn}（アローラ）`,
            names: data.name,
          };
        }

        return {
          form,
          slug,
          idx: data.idx,
          name_jpn: `${data.name.jpn}`,
          names: data.name,
        };
      });
  })
  .flat(2)
  .sort((a, b) => parseInt(a.idx, 10) - parseInt(b.idx, 10))
  .map((pokemon) => {
    return {
      ...pokemon,
      key: `${pokemon.idx}:${pokemon.form}`,
      names: [
        pokemon.names.eng.toLowerCase(),
        pokemon.names.jpn,
        convertKatakanaToHiragana(pokemon.names.jpn),
        normalizeRomajiName(pokemon.names.jpn_ro),
      ],
    };
  });

const file = `// tslint:disable
import { Pokemon } from '../domain/pokemon';
export const pokemons: Pokemon[] = ${JSON.stringify(pokemons)};`;

fs.writeFileSync(path.resolve(__dirname, '../src/app/data/pokemon-data.ts'), file);

function normalizeRomajiName(name: string): string {
  return name.toLowerCase().replace('ā', 'a-').replace('ī', 'i-').replace('ū', 'u-').replace('ē', 'e-').replace('ō', 'o-');
}

function convertKatakanaToHiragana(str: string): string {
  return str.replace(/[ァ-ン]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0x60);
  });
}
