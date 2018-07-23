import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    cdnAPI: 'http://csdept26.mtech.edu:30123',
    // this is only necessary when testing from public files. the server will
    //   include the appropriate asset info when requesting a ce
    resolveAssets(dsm) {
        function named(ce) {
            let promises = [],
                    hasTeaser = false;

            // if the playlist has a teaser query for it
            if (!Array.isArray(ce.playlist[0])) {
                promises.push($.getJSON(`/assets/${ce.playlist[0]}.json`)
                        .then((data) => {
                            ce.playlist[0] = data;
                        })
                        .catch(console.error));

                hasTeaser = true;
            }

            // replace all assets in the playlist
            for (let i = (hasTeaser ? 1 : 0); i < ce.playlist.length; i++) {
                let assetList = ce.playlist[i]

                // push the query for the primary asset of this sequence into the set
                promises.push($.getJSON(`/assets/${assetList[0]}.json`)
                        .then((data) => {
                            assetList[0] = data;
                        })
                        .catch(console.error));

                // replace all concurrent assets
                assetList[1].forEach((conAsset, index) => {
                    promises.push($.getJSON(`/assets/${conAsset}.json`)
                            .then((data) => {
                                assetList[1][index] = data;
                            })
                            .catch(console.error));
                });
            }

            return Promise.all(promises)
            .catch(() => {
                this.transitionTo('model-select');
            });
        }

        return Promise.all([
            Promise.all(Object.keys(dsm.ce_set).map((ce) => {
                return named(dsm.ce_set[ce]);
            })),
            Promise.all(dsm.idle_backgrounds.map((ce, index) => {
                return named(dsm.idle_backgrounds[index]);
            }))
        ])
        .then(() => {
            return dsm;
        })
        .catch(() => {
            this.transitionTo('model-select');
        });
    },
    resolveCEs(dsm, api = '') {
        let terminal = '';

        if (api === '') {
            terminal = '.json';    
        }
        
        return Promise.all([
            Promise.all(Object.keys(dsm.ce_set).map((ce) => {
                return $.getJSON(`${api}/ce/${ce}${terminal}`)
                .then((data) => {
                    data.attributes = dsm.ce_set[ce].attributes;
                    data.relationships = dsm.ce_set[ce].relationships;
                    dsm.ce_set[ce] = data;

                })
                .catch(console.error);
            })),
            Promise.all(dsm.idle_backgrounds.map((ce, index, arr) => {
                return $.getJSON(`${api}/ce/${ce}${terminal}`)
                .then((data) => {
                    arr[index] = data;
                })
                .catch(console.error);
            })),
            Promise.all(dsm.video_select_backgrounds.map((ce, index, arr) => {
                return $.getJSON(`${api}/ce/${ce}${terminal}`)
                .then((data) => {
                    arr[index] = data;
                })
                .catch(console.error);
            }))
        ])
        .then(() => {
            return dsm;
        })
        .catch(() => {
            this.transitionTo('model-select');
        });
    },
    model(params) {
        return $.getJSON(`${this.cdnAPI}/dsm/${params.id}`)
        .then((data) => {
            return this.resolveCEs(data, this.cdnAPI);
        }).catch(() => {
            return $.getJSON(`/${params.id}.json`).then((data) => {
                return this.resolveCEs(data).then(this.resolveAssets).catch(console.error);
            }).catch(() => {
                this.transitionTo('model-select');
            });
        });
    }
});
