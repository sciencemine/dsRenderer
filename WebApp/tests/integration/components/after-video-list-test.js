import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import EmberObject from '@ember/object';

const modelDataStub = Service.extend({
    _data: null
});

moduleForComponent('after-video-list', 'Integration | Component | after video list', {
  integration: true,

  beforeEach() {
    this.register('service:model-data', modelDataStub);
    this.inject('model-data', { as: 'modelData' });
  }
});

test('it renders', function(assert) {
  let testData = EmberObject.create(
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

  this.set('data', testData);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{after-video-list data=data}}`);

  assert.equal(this.$().text().trim(), '');
});
