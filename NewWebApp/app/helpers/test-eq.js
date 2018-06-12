import { helper } from '@ember/component/helper';

export function testEq([ arg0, arg1 ]) {
  return arg0 === arg1;
}

export default helper(testEq);
