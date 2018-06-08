import EmberObject from '@ember/object';
import PlaylistHandlerMixin from 'web-app/mixins/playlist-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | playlist-handler', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let PlaylistHandlerObject = EmberObject.extend(PlaylistHandlerMixin);
    let subject = PlaylistHandlerObject.create();
    assert.ok(subject);
  });
});
