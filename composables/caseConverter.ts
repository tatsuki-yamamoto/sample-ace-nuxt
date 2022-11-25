export const useCaseConverter = () => {
  // キーが文字列のみのオブジェクト
  type StringKeyObject = {
    [key in string]: any;
  };

  // StringKeyObjectのタイプガード.
  const checkStringKeyObject = (arg: any): arg is StringKeyObject =>
    arg !== null && typeof arg === 'object' && Object.keys(arg).every((key) => typeof key === 'string');

  // 文字列をスネークケースからキャメルケースに変換.
  const toCamelFromSnake = (snake: string): string => {
    // _+小文字を大文字にする(例:_a を A)
    return snake.replace(/_./g, (str) => str.charAt(1).toUpperCase());
  };

  // オブジェクトのキーをスネークケースからキャメルケースに変換.
  const convertObjectKeyToCamelFromSnake = (obj: any): any =>
    Array.isArray(obj)
      ? obj.map(convertObjectKeyToCamelFromSnake)
      : checkStringKeyObject(obj)
      ? Object.keys(obj).reduce((acc: StringKeyObject, key) => {
          acc[toCamelFromSnake(key)] = convertObjectKeyToCamelFromSnake(obj[key]);
          return acc;
        }, {})
      : obj;

  // 文字列をキャメルケースからスネークケースに変換.
  const toSnakeFromCamel = (camel: string): string => {
    // 大文字を_+小文字にする(例:A を _a)
    return camel.replace(/([A-Z])/g, (str) => '_' + str.charAt(0).toLowerCase());
  };

  // オブジェクトのキーをキャメルケースからスネークケースに変換.
  const convertObjectKeyToSnakeFromCamel = (obj: any): any =>
    Array.isArray(obj)
      ? obj.map(convertObjectKeyToSnakeFromCamel)
      : checkStringKeyObject(obj)
      ? Object.keys(obj).reduce((acc: StringKeyObject, key) => {
          acc[toSnakeFromCamel(key)] = convertObjectKeyToSnakeFromCamel(obj[key]);
          return acc;
        }, {})
      : obj;

  return {
    convertObjectKeyToSnakeFromCamel,
    convertObjectKeyToCamelFromSnake,
  };
};
