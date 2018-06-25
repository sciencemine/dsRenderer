import EmberObject from '@ember/object';
import TactileControlsMixin from 'web-app/mixins/tactile-controls';
import { module, test } from 'qunit';

module('Unit | Mixin | tactile-controls', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let TactileControlsObject = EmberObject.extend(TactileControlsMixin);
    let subject = TactileControlsObject.create();
    assert.ok(subject);
  });
});
