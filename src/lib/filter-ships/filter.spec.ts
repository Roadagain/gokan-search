import { NewShip, Ship } from '../ship';
import { filterNewShips, filterShips } from './filter';
import { NewSearchWords } from './search-words';

describe('filterShips', () => {
  const shipWithTag = {
    name: '',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  } as Ship;
  const shipWithName = {
    name: 'name',
    tags: [],
    showDefault: true,
  } as Ship;
  const shipWithNameAndTag = {
    name: 'name2',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  } as Ship;
  const hiddenShipWithName = {
    name: 'name_hidden',
    tags: [],
    showDefault: false,
  } as Ship;
  const hiddenShipWithTag = {
    name: '',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: false,
  } as Ship;
  const hiddenShipWithNameAndTag = {
    name: 'name_hidden2',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: false,
  } as Ship;
  const ships = [
    shipWithTag,
    shipWithName,
    shipWithNameAndTag,
    hiddenShipWithTag,
    hiddenShipWithName,
    hiddenShipWithNameAndTag,
  ];

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(filterShips(ships, { name: [], tag: ['label'] }, false)).toEqual(
          [shipWithTag, shipWithNameAndTag]
        );
      });

      it('マイナスタグを含まない結果が返る', () => {
        expect(
          filterShips(ships, { name: [], tag: ['-label'] }, false)
        ).toEqual([shipWithName]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(filterShips(ships, { name: ['name'], tag: [] }, false)).toEqual([
          shipWithName,
          shipWithNameAndTag,
        ]);
      });

      it('マイナスワードを含まない結果が返る', () => {
        expect(filterShips(ships, { name: ['-name'], tag: [] }, false)).toEqual(
          [shipWithTag]
        );
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterShips(ships, { name: ['name'], tag: ['label'] }, false)
        ).toEqual([shipWithNameAndTag]);
      });
    });

    describe('検索対象が設定されていない場合', () => {
      it('全てのデフォルト表示キャラが返る', () => {
        expect(filterShips(ships, { name: [], tag: [] }, false)).toEqual([
          shipWithTag,
          shipWithName,
          shipWithNameAndTag,
        ]);
      });
    });

    describe('検索にヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterShips(
            ships,
            { name: ['not-included-name'], tag: ['not-included-tag'] },
            false
          )
        ).toEqual([]);
      });
    });
  });

  describe('全キャラが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(filterShips(ships, { name: [], tag: ['label'] }, true)).toEqual([
          shipWithTag,
          shipWithNameAndTag,
          hiddenShipWithTag,
          hiddenShipWithNameAndTag,
        ]);
      });

      it('マイナスタグを含まない結果が返る', () => {
        expect(filterShips(ships, { name: [], tag: ['-label'] }, true)).toEqual(
          [shipWithName, hiddenShipWithName]
        );
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(filterShips(ships, { name: ['name'], tag: [] }, true)).toEqual([
          shipWithName,
          shipWithNameAndTag,
          hiddenShipWithName,
          hiddenShipWithNameAndTag,
        ]);
      });

      it('マイナスワードを含まない結果が返る', () => {
        expect(filterShips(ships, { name: ['-name'], tag: [] }, true)).toEqual([
          shipWithTag,
          hiddenShipWithTag,
        ]);
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterShips(ships, { name: ['name'], tag: ['label'] }, true)
        ).toEqual([shipWithNameAndTag, hiddenShipWithNameAndTag]);
      });
    });

    describe('検索対象が設定されていない場合', () => {
      it('全キャラが返る', () => {
        expect(filterShips(ships, { name: [], tag: [] }, true)).toEqual(ships);
      });
    });

    describe('検索にヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterShips(
            ships,
            { name: ['not-included-name'], tag: ['not-included-tag'] },
            true
          )
        ).toEqual([]);
      });
    });
  });
});

describe('filterNewShips', () => {
  const first: NewShip = {
    id: 1,
    name: '戦艦',
    kana: 'せんかん',
    category: '戦艦級',
    type: '戦艦',
    speed: '低速',
    range: '長射程',
    equipments: ['艦隊司令部施設', '水上戦闘機'],
    abilities: ['特殊攻撃'],
    showDefault: true,
  };
  const hiddenFirst: NewShip = {
    ...first,
    showDefault: false,
  };
  const second: NewShip = {
    id: 2,
    name: '駆逐艦',
    kana: 'くちくかん',
    category: '駆逐艦',
    type: '駆逐艦',
    speed: '高速',
    range: '短射程',
    equipments: [],
    abilities: ['無条件先制対潜'],
    showDefault: true,
  };
  const hiddenSecond: NewShip = {
    ...second,
    showDefault: false,
  };
  const third: NewShip = {
    id: 3,
    name: '航空巡洋艦',
    kana: 'こうくうじゅんようかん',
    category: '重巡級',
    type: '航空巡洋艦',
    speed: '高速',
    range: '中射程',
    equipments: ['水上爆撃機', '水上戦闘機'],
    abilities: [],
    showDefault: true,
  };
  const hiddenThird: NewShip = {
    ...third,
    showDefault: false,
  };
  const ships: NewShip[] = [
    first,
    hiddenFirst,
    second,
    hiddenSecond,
    third,
    hiddenThird,
  ];
  const emptyWords: NewSearchWords = {
    names: [],
    categories: [],
    types: [],
    speeds: [],
    ranges: [],
    equipments: [],
    abilities: [],
  };

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索条件がない場合', () => {
      it('デフォルト表示キャラ全員が返る', () => {
        expect(filterNewShips(ships, emptyWords, false)).toEqual([
          first,
          second,
          third,
        ]);
      });
    });

    describe('名前の指定がある場合', () => {
      it('指定ワードを全て含む名前の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          names: ['艦', '空'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([third]);
      });

      it('マイナスワードを含まない艦船の名前が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          names: ['艦', '-空'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([first, second]);
      });
    });

    describe('艦種カテゴリの指定がある場合', () => {
      it('指定された艦種カテゴリの艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          categories: ['駆逐艦'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([second]);
      });

      it('マイナス指定された艦種カテゴリ以外の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          categories: ['-戦艦級'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([second, third]);
      });
    });

    describe('艦種の指定がある場合', () => {
      it('指定された艦種の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          types: ['戦艦'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([first]);
      });

      it('マイナス指定された艦種以外の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          types: ['-戦艦'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([second, third]);
      });
    });

    describe('速度の指定がある場合', () => {
      it('指定された速度の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          speeds: ['高速'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([second, third]);
      });

      it('マイナス指定されていない速度の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          speeds: ['-高速'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([first]);
      });
    });

    describe('射程の指定がある場合', () => {
      it('指定された射程の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          ranges: ['長射程'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([first]);
      });

      it('マイナス指定されていない射程の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          ranges: ['-中射程'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([first, second]);
      });
    });

    describe('装備の指定がある場合', () => {
      it('指定された装備を装備できる艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          equipments: ['水上戦闘機'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([first, third]);
      });

      it('マイナス指定された装備を装備できない艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          equipments: ['-水上戦闘機'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([second]);
      });
    });

    describe('特性の指定がある場合', () => {
      it('指定された特性を持つ艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          abilities: ['無条件先制対潜'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([second]);
      });

      it('マイナス指定された特性を持たない艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          abilities: ['-無条件先制対潜'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([first, third]);
      });
    });

    describe('複数の指定がある場合', () => {
      it('指定を全て満たす艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          speeds: ['高速'],
          ranges: ['-短射程'],
        };
        expect(filterNewShips(ships, words, false)).toEqual([third]);
      });
    });
  });

  describe('全キャラが対象の場合', () => {
    describe('検索条件がない場合', () => {
      it('デフォルト表示キャラ全員が返る', () => {
        expect(filterNewShips(ships, emptyWords, true)).toEqual([
          first,
          hiddenFirst,
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('名前の指定がある場合', () => {
      it('指定ワードを全て含む名前の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          names: ['艦', '空'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          third,
          hiddenThird,
        ]);
      });

      it('マイナスワードを含まない艦船の名前が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          names: ['艦', '-空'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          second,
          hiddenSecond,
        ]);
      });
    });

    describe('艦種カテゴリの指定がある場合', () => {
      it('指定された艦種カテゴリの艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          categories: ['駆逐艦'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
        ]);
      });

      it('マイナス指定された艦種カテゴリ以外の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          categories: ['-戦艦級'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('艦種の指定がある場合', () => {
      it('指定された艦種の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          types: ['戦艦'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
        ]);
      });

      it('マイナス指定された艦種以外の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          types: ['-戦艦'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('速度の指定がある場合', () => {
      it('指定された速度の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          speeds: ['高速'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });

      it('マイナス指定されていない速度の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          speeds: ['-高速'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
        ]);
      });
    });

    describe('射程の指定がある場合', () => {
      it('指定された射程の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          ranges: ['長射程'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
        ]);
      });

      it('マイナス指定されていない射程の艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          ranges: ['-中射程'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          second,
          hiddenSecond,
        ]);
      });
    });

    describe('装備の指定がある場合', () => {
      it('指定された装備を装備できる艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          equipments: ['水上戦闘機'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          third,
          hiddenThird,
        ]);
      });

      it('マイナス指定された装備を装備できない艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          equipments: ['-水上戦闘機'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
        ]);
      });
    });

    describe('特性の指定がある場合', () => {
      it('指定された特性を持つ艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          abilities: ['無条件先制対潜'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
        ]);
      });

      it('マイナス指定された特性を持たない艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          abilities: ['-無条件先制対潜'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('複数の指定がある場合', () => {
      it('指定を全て満たす艦船が返る', () => {
        const words: NewSearchWords = {
          ...emptyWords,
          speeds: ['高速'],
          ranges: ['-短射程'],
        };
        expect(filterNewShips(ships, words, true)).toEqual([
          third,
          hiddenThird,
        ]);
      });
    });
  });
});