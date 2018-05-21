import { isArray } from '@ember/array';
import { helper } from '@ember/component/helper';

export function isSingleVideo([arg]) {
  return isArray(arg) && arg.length === 1;
}

export default helper(isSingleVideo);
