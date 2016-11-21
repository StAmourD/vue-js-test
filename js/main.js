var myThings = [{
    sono: '1112',
    custno: 'myItem one9',
    shipvia: '1myItem one9'
}, {
    sono: '1113',
    custno: 'my item two9',
    shipvia: '1myItem one9'
}, {
    sono: '1114',
    custno: 'another item9',
    shipvia: '1myItem one9'
}];

myThings = [{
    "sono": "613161",
    "custno": "REECE",
    "rqdate": "6\/6\/2016",
    "shipvia": "Truck"
}, {
    "sono": "613966",
    "custno": "TWINO",
    "rqdate": "7\/1\/2016",
    "shipvia": "BEST WAY"
}, {
    "sono": "614043",
    "custno": "ANDERP",
    "rqdate": "7\/6\/2016",
    "shipvia": "BW"
}];

Vue.component('sono-item', {
    props: {
        data: Array
    },
    template: '#grid-template',
    computed: {
        columns: function() {
            var keys = [];
            for (var key in this.data[0]) {
                if (this.data[0].hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys;
        }
    }
});

var app = new Vue({
    el: '#so-list',
    data: {
        soData: myThings
    }
});
