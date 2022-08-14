import {
  isTaggedCharacter,
  loadCharactersDataFromJson,
  loadSampleCharactersData,
} from './load-data';
import charactersData from '../../sample/characters-data/sample.json';

describe('isTaggedCharacter', () => {
  describe('データ形式が正しい場合', () => {
    it('trueが返る', () => {
      const obj = {
        name: 'Name',
        tags: ['test1', 'test2'],
        showDefault: false,
      };
      expect(isTaggedCharacter(obj)).toBeTruthy();
    });
  });

  describe('nameがstringでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 1,
        tags: ['test1', 'test2'],
        showDefault: true,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列でない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: 'aaa',
        showDefault: true,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列かつ文字列でない要素を含む場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: ['test1', 2],
        showDefault: false,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('showDefaultがbooleanでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: ['test1', 'test2'],
        showDefault: 1,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });
});

describe('loadCharactersDataFromJson', () => {
  describe('データ形式が正しい場合', () => {
    const json = [
      {
        name: 'Alpha',
        tags: ['one', 'two'],
        showDefault: true,
      },
      {
        name: 'Beta',
        tags: [],
        showDefault: false,
      },
    ];

    it('読み込んだキャラクターデータが返る', () => {
      expect(loadCharactersDataFromJson(json)).toEqual(json);
    });
  });

  describe('データ形式が不正な場合', () => {
    const json = [
      {
        name: 1,
        tags: ['one, two'],
        showDefault: true,
      },
      {
        name: 'Beta',
        tags: ['three'],
        showDefault: true,
      },
    ];

    it('エラーが返る', () => {
      expect(() => loadCharactersDataFromJson(json)).toThrowError(
        'Invalid characters data'
      );
    });
  });
});

describe('loadSampleCharactersData', () => {
  it('サンプルデータが返る', () => {
    expect(loadSampleCharactersData()).toStrictEqual(charactersData);
  });
});
