import { helper } from '@ember/component/helper';

export function determinePlayer([ arg ]) {
  return arg.split('/')[0];
}

export default helper(determinePlayer);
