import KeyboardControlsMixin from 'digital-signage-app-v2/mixins/keyboard-controls';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Mixin | keyboard controls');

// Replace this with your real tests.
test('it works', function(assert) {
  let KeyboardControlsObject = EmberObject.extend(KeyboardControlsMixin);
  let subject = KeyboardControlsObject.create();
  assert.ok(subject);
});
