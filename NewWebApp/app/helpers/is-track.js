import { helper } from '@ember/component/helper';

export function isTrack([ arg ]) {
  return arg === 'text/vtt';
}

export default helper(isTrack);
