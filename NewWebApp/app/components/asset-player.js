import Component from '@ember/component';
// assets need to emit an event when they are finished doing their thing

export default Component.extend({
    classNames: [ 'asset-player' ],
    tagName: 'video',
    isTeaser: true,

    init() {
        this._super(...arguments);

        let asset = this.get('asset');

        switch (asset.type) {
            // fix if it is a video
            case 'video/webm':
                this.setProperties({
                    tagName: 'video',
                    src: asset.url,
                    type: asset.type,
                    autoplay: 'autoplay',
                    attributeBindings: [ 'autoplay', 'src', 'type' ]
                });
            break;
            // fix if it is a sub
            case 'text/vtt':
                this.setProperties({
                    tagName: 'track',
                    src: asset.url,
                    attributeBindings: [ 'src' ]
                });
            break;
            // if image
            case 'image/png':
                this.setProperties({
                    tagName: 'img',
                    src: asset.url,
                    attributeBindings: [ 'src' ]
                });
            break;
        }

        for (let option in asset.options) {
            this.set(option, asset.options[option]);
            this.get('attributeBindings').push(option);
        }

        if (this.get('isTeaser')) {
            this.setProperties({
                muted: 'muted',
                loop: 'loop'
            });
            this.set('attributeBindings', this.get('attributeBindings').concat([ 'muted', 'loop' ]));
        }
    }
});
