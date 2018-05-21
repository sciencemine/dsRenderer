import { typeOf } from '@ember/utils';
import { helper } from '@ember/component/helper';

export function isObject([arg]) {
  return typeOf(arg) === 'object';
}

export default helper(isObject);
