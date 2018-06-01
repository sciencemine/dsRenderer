import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    cdnAPI: 'http://csdept26.mtech.edu:30120',
    // this is only necessary when testing from public files. the server will
    //   include the appropriate asset info when requesting a ce
    resolveAssets(dsm) {
        return Promise.all(Object.keys(dsm.ce_set).map((ce) => {
            let ceObj = dsm.ce_set[ce],
                    promises = [],
                    hasTeaser = false;

            // if the playlist has a teaser query for it
            if (!Array.isArray(ceObj.playlist[0])) {
                promises.push($.getJSON(`/assets/${ceObj.playlist[0]}.json`)
                        .then((data) => {
                            ceObj.playlist[0] = data;
                        })
                        .catch(console.error));

                hasTeaser = true;
            }

            // replace all assets in the playlist
            for (let i = (hasTeaser ? 1 : 0); i < ceObj.playlist.length; i++) {
                let assetList = ceObj.playlist[i]

                // push the query for the primary asset of this sequence into the set
                promises.push($.getJSON(`/assets/${assetList[0]}.json`)
                        .then((data) => {
                            assetList[0] = data;
                        })
                        .catch(console.error));

                // replace all concurrent assets
                assetList[1].forEach((conAsset, index) => {
                    promises.push($.getJSON(`/assets/${ceObj.conAsset}.json`)
                            .then((data) => {
                                assetList[1][index] = data;
                            })
                            .catch(console.error));
                });
            }

            return Promise.all(promises)
            .then(() => {
                dsm.ce_set[ce] = ceObj;
            })
            .catch(() => {
                this.transitionTo('model-select');
            });
        }))
        .then(() => {
            return dsm;
        })
        .catch(() => {
            this.transitionTo('model-select');
        });
    },
    resolveCEs(dsm) {
        return Promise.all(Object.keys(dsm.ce_set).map((ce) => {
            return $.getJSON(`/ces/${ce}.json`)
            .then((data) => {
                data.attributes = dsm.ce_set[ce].attributes;
                data.relations = dsm.ce_set[ce].relations;
                dsm.ce_set[ce] = data;

            })
            .catch(() => {
                return $.getJSON(`${this.cdnAPI}/ce/${ce}`)
                .then((data) => {
                    data.attributes = dsm.ce_set[ce].attributes;
                    data.relations = dsm.ce_set[ce].relations;
                    dsm.ce_set[ce] = data;
                })
                .catch(console.error);
            });
        }))
        .then(() => {
            return dsm;
        })
        .catch(() => {
            this.transitionTo('model-select');
        });
    },
    model(params) {
        return $.getJSON(`/${params.id}.json`)
        .then((data) => {
            return this.resolveCEs(data).then(this.resolveAssets).catch(console.error);
        }).catch(() => {
            return $.getJSON(`${this.cdnAPI}/dsm/${params.id}`).then((data) => {
                return this.resolveCEs(data);
            }).catch(() => {
                this.transitionTo('model-select');
            });
        });
    }
});
