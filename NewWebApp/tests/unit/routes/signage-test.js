import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | signage', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:signage');
    assert.ok(route);
  });
});
