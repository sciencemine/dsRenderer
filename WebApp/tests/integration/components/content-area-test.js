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

moduleForComponent('content-area', 'Integration | Component | content area', {
  integration: true,

  beforeEach() {
    this.register('service:model-data', modelDataStub);
    this.inject('model-data', { as: 'modelData' });
  }
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#content-area}}
      test
    {{/content-area}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'test');
});
