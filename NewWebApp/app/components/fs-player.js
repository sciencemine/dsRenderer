import Component from '@ember/component';

export default Component.extend({
    classNames: [ 'frontscreen-player' ],
    actions: {
        ceDone(/* ce */) {
            console.log('ce done');
        }
    }
});
