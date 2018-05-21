import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function makeStackStyle([arg1, arg2]) {
  return htmlSafe(`left: ${arg1}%; top: ${arg2}%;`);
}

export default helper(makeStackStyle);
