import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const modelDataStub = Service.extend({
    _data: null
});

moduleForComponent('menu-bar', 'Integration | Component | menu bar', {
  integration: true,

  beforeEach() {
    this.register('service:model-data', modelDataStub);
    this.inject('model-data', { as: 'modelData' });
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{menu-bar}}`);

  assert.equal(this.$().text().trim(), '');
});
