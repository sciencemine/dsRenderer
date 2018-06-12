import Component from '@ember/component';
// assets need to emit an event when they are finished doing their thing

export default Component.extend({
    classNames: [ 'asset-player' ],
    isTeaser: false,

    bindOptions() {
        let asset = this.get('asset');
        
        for (let option in asset.options) {
            this.set(option, asset.options[option]);
            this.get('attributeBindings').push(option);
        }
    }
});
