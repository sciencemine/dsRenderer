import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    cdnAPI: 'http://csdept26.mtech.edu:30120',

    model() {
        return $.getJSON(`${this.cdnAPI}/dsm`)
        .then((data) => {
            return data;
        })
        .catch(console.error);
    }
});
