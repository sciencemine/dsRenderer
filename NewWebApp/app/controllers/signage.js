import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    state: service(),
    // boolean for if the foreground should be playing
    renderFgPlayer: false,
    // boolean for if video select should be rendered
    renderCeSelect: false,
    // these are the primary items, i.e. the items the user can select
    ceSelectItems: computed('model.ce_set', function() {
        let ceSet = this.get('model.ce_set');
        let keys = Object.keys(ceSet);

        return keys.map((key) => { return ceSet[key]; });
    }).readOnly(),
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
    }).readOnly(),
    // this is the ce to be rendered in the fg player
    fgCe: null,
    // this is for if te fg is playing the video or not. needed for knowing
    //   whether to play the bg videos or not
    playBg: true,
    // think about states
    // idle, video select, video-playing
    // bg should play in idle and in video select IF there are no video select bgs
    actions: {
        // this handles the callback when a ce is selected somewhere
        ceSelected(ce) {
            this.setProperties({
                fgCe: ce,
                renderFgPlayer: true,
                playBg: false
            });

            this.get('state').setState('playing');
        },
        // this handles the callback when the fg player is done playing
        ceDone(/* ce */) {
            this.setProperties({
                fgCe: null,
                renderFgPlayer: false,
                playBg: true
            });
            
            this.get('state').setState('select');
        },
        // this handles updating the state when the ce select times out
        ceSelectTimeout() {
            this.setProperties({
                fgCe: null,
                renderFgPlayer: false,
                playBg: true
            });
            this.get('state').setState('idle');
        },
        // this handles waking the system out of idle mode
        wake() {
            let state = this.get('state');

            // only wake if in the idle state
            if (state.current === state.states.idle) {
                state.setState('select');
            }
        },
        // this handles when a fg video is paused
        fgPause() {
            this.get('state').setState('select');
        },
        // this handles when a fg video is played
        fgPlay() {
            this.set('playBg', false);

            this.get('state').setState('playing');
        }
    }
});
