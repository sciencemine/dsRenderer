import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
    _currentState: 'IDLE',
    _previousState: '',
    _states: null,
    init() {
        this._super(...arguments);
        
        this.set('_states', {
            idle: 'IDLE',
            select: 'CE_SELECT',
            playing: 'CE_PLAYING'
        });
    },
    current: computed('_currentState', function() {
        return this.get('_currentState');
    }).readOnly(),
    previous: computed('_previousState', function() {
        return this.get('_previousState');
    }).readOnly(),
    states: computed('_states', function() {
        return this.get('_states');
    }).readOnly(),
    setState(arg) {
        let states = this.get('_states');

        if (arg in states && this.get('current') !== states[arg]) {
            this.set('_previousState', this.get('_currentState'));
            this.set('_currentState', states[arg]);
        }
        else if(Object.values(states).includes(arg) && this.get('current') != arg) {
            this.set('_previousState', this.get('_currentState'));
            this.set('_currentState', arg);
        }
    }
});