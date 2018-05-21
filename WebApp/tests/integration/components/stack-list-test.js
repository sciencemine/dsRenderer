import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import EmberObject from '@ember/object';

const modelDataStub = Service.extend({
    _data: null,

  beforeEach() {
    this.register('service:model-data', modelDataStub);
    this.inject('model-data', { as: 'modelData' });
  }
});

moduleForComponent('stack-list', 'Integration | Component | stack list', {
  integration: true
});

test('it renders', function(assert) {
  let data = EmberObject.create(
    [
      {
        prettyName: "History",
        description: "",
        x: 0,
        y: 0,
        videos: [
        ]
      }
    ]
  );

  this.set('baba', (actual) => {
    assert.ok(actual);
  });

  this.set('testData', data);

  this.render(hbs`{{stack-list data=testData modelIdentifier='' selectedCallback=(action baba)}}`);

  assert.equal(this.$().text().trim(), '');
});
