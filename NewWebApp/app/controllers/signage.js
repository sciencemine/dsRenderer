import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import $ from 'jquery';

export default Controller.extend({
    cdnAPI: 'http://csdept26.mtech.edu:30123',
    state: service(),
    // boolean for if the foreground should be playing
    renderFgPlayer: false,
    // boolean for if video select should be rendered
    renderCeSelect: false,
    // object representing the traversal so far
    path: null,
    // holds the current events that are going on for the path
    curPathEvents: null,
    // these are the primary items, i.e. the items the user can select
    ceSelectItems: computed('fgCe', 'model.ce_set', function() {
        let ceSet = this.get('model.ce_set'),
            fgCe = this.get('fgCe'),
            keys = Object.keys(ceSet);

        if (isPresent(fgCe)) {
            return fgCe.relationships.map((relationship) => { return ceSet[relationship.to]; });
        }
        else {
            return keys.map((key) => { return ceSet[key]; });
        }
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
    newPath(initialCE) {
        let model = this.get('model');

        let path = {
            model: {
                id_model: model._id,
                version_model: model.version,
                descriptionn_model: model.description,
                author: model.author
            },
            relations: [
                {
                    ce_list: [
                        null,
                        this.makePathCE(initialCE)
                    ]
                }
            ]
        };

        return path;
    },
    makePathCE(ce, events = [ ]) {
        let pathCE = { };

        pathCE.id_ce = ce._id,
        pathCE.version_ce = ce.version;
        pathCE.title_ce = ce.title;
        pathCE.description_ce = ce.description;
        pathCE.events = events;
    
        return pathCE;
    },
    makePathEvent(assetData) {
        let pathEvent = {
            id_asset: assetData._id,
            version_asset: assetData.version,
            title_asset: assetData.title,
            description_asset: assetData.description,
            type: assetData.type,
            url: assetData.url,
            playspec: Date.now()
        }

        return pathEvent;
    },
    sendPath() {
        return $.ajax({
            type: 'POST',
            url: `${this.get('cdnAPI')}/path`,
            contentType: 'application/json',
            data: JSON.stringify(this.get('path'))
        });
    },
    updateEvents() {
        let curPathEvents = this.get('curPathEvents'),
                relations = this.get('path.relations'),
                relationIndex = relations.length - 1;

        if (isPresent(curPathEvents)) {
            let events = relations[relationIndex].ce_list[1].events
            // the last path entry and push the events to the end
            events = events.concat(curPathEvents);
            this.set(`path.relations.${relationIndex}.ce_list.1.events`, events);
            this.set('curPathEvents', null);
        }
    },
    // think about states
    // idle, video select, video-playing
    // bg should play in idle and in video select IF there are no video select bgs
    actions: {
        // this handles the callback when a ce is selected somewhere
        ceSelected(ce) {
            let fgCe = this.get('fgCe'),
                    path = this.get('path'),
                    relationship = null;

            if (isPresent(fgCe)) {
                relationship = fgCe.relationships.find((el) => { return el.to === ce._id; });
            }
            
            // if there is a path and the selected is in the relationships, update path
            if (isPresent(path) &&
                    relationship) {
                this.updateEvents();
                let attribute = this.get('model.attributes')[relationship.attribute];

                let relation = {
                    title_attr: attribute.title,
                    description_attr: attribute.description,
                    weight: relationship.weight,
                    ce_list: [
                        this.makePathCE(fgCe),
                        this.makePathCE(ce)
                    ]
                };

                path.relations.push(relation);
            }
            // else if there is a path but it is broken, send current and start a new one
            else if (isPresent(path)) {
                this.updateEvents();
                
                this.sendPath()
                .then((data) => {
                    this.set('path', this.newPath(ce));
                })
                .catch((err) => {
                    this.set('path', this.newPath(ce));
                });
            }
            else {
                this.set('path', this.newPath(ce));
            }

            this.setProperties({
                fgCe: ce,
                renderFgPlayer: true,
                playBg: false
            });

            this.get('state').setState('playing');
        },
        // this handles the callback when the fg player is done playing
        ceDone(/* ce */) {
            this.updateEvents();

            this.setProperties({
                renderFgPlayer: false,
                playBg: true
            });
            
            this.get('state').setState('select');
        },
        // this handles updating the state when the ce select times out
        ceSelectTimeout() {
            if (isPresent(this.get('path'))) {
                this.updateEvents();
                this.sendPath()
                .then(console.log)
                .catch(console.error);
            }

            this.setProperties({
                fgCe: null,
                renderFgPlayer: false,
                playBg: true,
                path: null
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
        assetDone(e, asset) {
            let curPathEvents = this.get('curPathEvents'),
                    targetAsset = curPathEvents.findIndex((event) => {
                return asset._id === event.id_asset;
            });
            
            if (targetAsset !== -1) {
                // update the playspec to be 100% completed
                curPathEvents[targetAsset].playspec =
                        parseInt(curPathEvents[targetAsset].playspec);
            }
        },
        assetStart(assetData) {
            let primaryAssetEvent = this.makePathEvent(assetData[0]),
                    pathEventsList = assetData[1].map(this.makePathEvent);
            pathEventsList.push(primaryAssetEvent);
            this.set('curPathEvents', pathEventsList);
        },
        // this handles when a fg video is paused
        fgPause(asset, e) {
            let src = e.srcElement,
                watched = 0;

            if ('currentTime' in src) {
                let fractionWatched = src.currentTime / src.duration;
                // we want only two decimal places
                fractionWatched = parseInt(fractionWatched * 100) / 100;
                watched = fractionWatched;
            }

            let curPathEvents = this.get('curPathEvents');
            let targetAsset = curPathEvents.findIndex((event) => {
                return asset._id === event.id_asset;
            });
            
            if (targetAsset !== -1) {
                // update the playspect to be 100% completed
                curPathEvents[targetAsset].playspec =
                        parseInt(curPathEvents[targetAsset].playspec) + watched;
            }
            
            this.get('state').setState('select');
        },
        // this handles when a fg video is played
        fgPlay() {
            this.set('playBg', false);

            this.get('state').setState('playing');
        }
    }
});
