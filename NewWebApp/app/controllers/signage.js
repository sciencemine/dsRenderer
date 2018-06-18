import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
    // boolean for if the foreground should be playing
    renderFgPlayer: false,
    // boolean for if video select should be rendered
    renderCeSelect: false,
    // these are the primary items, i.e. the items the user can select
    ceSelectItems: null,
    // these are the items that play in the background of the video select.
    // these should be the same as the bgPlayer itmes unless specified in the model
    // we need this because we want to re use the bg player for the video select list
    bgPlayerItems: computed('model', 'renderCeSelect', function() {
        let ceSBgs = this.model.video_select_backgrounds;

        if (!this.get('renderCeSelect') || ceSBgs < 1) {
            return this.model.idle_backgrounds;
        }
        else {
            return ceSBgs;
        }
    }),
    // this is the ce to be rendered in the fg player
    fgCe: null,
    // this is for if te fg is playing the video or not. needed for knowing
    //   whether to play the bg videos or not
    playBg: true,
    init() {
        this._super(...arguments);
        
        // initialize the arrays
        this.set('ceSelectItems', A());
    },
    // think about states
    // idle, video select, video-playing
    // bg should play in idle and in video select IF there are no video select bgs
    actions: {
        // this handles the callback when a ce is selected somewhere
        ceSelected(ce) {
            this.setProperties({
                fgCe: ce,
                renderFgPlayer: true,
                renderCeSelect: false,
                playBg: false
            });
        },
        // this handles the callback when the fg player is done playing
        ceDone(/* ce */) {
            this.setProperties({
                fgCe: null,
                renderFgPlayer: false,
                renderCeSelect: true,
                ceSelectItems: this.get('model.ce_set'),
                playBg: true
            });
        },
        // this handles updating the state when the ce select times out
        ceSelectTimeout() {
            this.setProperties({
                renderCeSelect: false,
                ceSelectItems: A()
            });
        },
        // this handles waking the system out of idle mode
        wake() {
            if (!this.get('renderCeSelect') && !this.get('renderFgPlayer')) {
                this.setProperties({
                    renderCeSelect: true,
                    ceSelectItems: this.get('model.ce_set')
                });
            }
        },
        // this handles when a fg video is paused
        fgPause() {
            this.setProperties({
                renderCeSelect: true,
                ceSelectItems: this.get('model.ce_set')
            });
        },
        // this handles when a fg video is played
        fgPlay() {
            this.setProperties({
                renderCeSelect: false,
                ceSelectItems: A(),
                playBg: false
            });
        }
    }
});
