import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import { computed } from '@ember/object';

const modelDataStub = Service.extend({
    _data: null,

    keyboard: computed('_data', function() {
        let data = this.get('_data');

        return data ? data.keyboard : null;
    })
});

moduleForComponent('video-player', 'Integration | Component | video player', {
  integration: true,

  beforeEach() {
    this.register('service:model-data', modelDataStub);
    this.inject('model-data', { as: 'modelData' });
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{video-player}}`);

  assert.equal(this.$().text().trim(), '');
});
