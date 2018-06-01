import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    cdnAPI: 'http://csdept26.mtech.edu:30120',
    resolveCEs(dsm) {
        return Promise.all(Object.keys(dsm.ce_set).map((ce) => {
            return $.getJSON(`${this.cdnAPI}/ce/${ce}`)
            .then((data) => {
                dsm.ce_set[ce].data = data;
            })
            .catch(() => {
                return $.getJSON(`/ces/${ce}.json`)
                .then((data) => {
                    dsm.ce_set[ce].data = data;
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
        return $.getJSON(`${this.cdnAPI}/dsm/${params.id}`)
        .then((data) => {
            return this.resolveCEs(data);
        }).catch(() => {
            return $.getJSON(`/${params.id}.json`).then((data) => {
                return this.resolveCEs(data);
            }).catch(() => {
                this.transitionTo('model-select');
            });
        });
    }
});
