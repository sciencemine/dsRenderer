import { helper } from '@ember/component/helper';

export function videoSelected([arg1, arg2]) {
  return arg1.toString() === arg2.toString();
}

export default helper(videoSelected);
