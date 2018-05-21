import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
    modelData: inject(),

    selectedVidAPos: 0,
    selectedVidBPos: 1,
    stackStyle: '',
    playerSize: '',
    isMuted: true,
    showVidA: true,
    isTeaser: true,
    videos: null,

    init() {
        this._super(...arguments);

        switch(this.get('videos').length){
            case 1:
                break;
            case 2:
                this.set('stackStyle', 'vid-shadows--2');
                break;
            case 3:
                this.set('stackStyle', 'vid-shadows--3');
                break;
            default:
                this.set('stackStyle', 'vid-shadows--4');
                break;
        }
    },
    vidA: computed('videos', 'selectedVidAPos', function() {
        return this.get(`videos.${this.get('selectedVidAPos')}`);
    }),
    vidB: computed('videos', 'selectedVidBPos', function() {
        return this.get(`videos.${this.get('selectedVidBPos')}`);
    }),
    modelIdentifier: computed('modelData.modelIdentifier', function() {
       let modelData = this.get('modelData');

       return modelData ? modelData.modelIdentifier : '';
    }),
    actions: {
        stackClicked() {
            this.get('onSelectedCallback') ();
        },
        getNextVideoA() {
            let videos = this.get('videos');

            if (isPresent(videos)) {
                let curArrayPos = parseInt(this.get('selectedVidAPos'));

                this.setProperties({
                    selectedVidAPos: (curArrayPos + 2) % videos.length,
                    showVidA: false
                });
            }
        },
        getNextVideoB(){
            let videos = this.get('videos');

            if (isPresent(videos)) {
                let curArrayPos = parseInt(this.get('selectedVidBPos'));

                this.setProperties({
                    selectedVidBPos: (curArrayPos + 2) % videos.length,
                    showVidA: true
                });
            }
        },
        stackHovered() {
            this.get('onHoverCallback') (this.get('videos'), this.get('selectedStackIndex'));
        }
    }
});
