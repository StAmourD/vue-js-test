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

var soList;
soList = [];

Vue.component('sono-item', {
    props: {
        data: Array,
        selectedcolumns: Array
    },
    template: '#grid-template',
    computed: {
        columns: function() {
            // if (typeof this.selectedcolumns === 'object' && this.selectedcolumns.isArray) {
            if (Array.isArray(this.selectedcolumns)) {
                return this.selectedcolumns;
            }
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

var MyColumns = ['sono', 'customercode', 'shipto', 'reqdate', 'reqtime'];
var Grid = new Vue({
    el: '#so-list',
    data: {
        // soData: myThings
        soData: soList,
        soColumns: MyColumns
    },
    methods: {
        refreshGrid: function() {
            // Grid.soData.push({
            //     sono: '777',
            //     shipvia: 'NONE'
            // });
            $.ajax({
                    url: './php/GetSOList.php',
                    data: {
                        StartDate: '8-6-16',
                        EndDate: '9-2-16'
                    }
                })
                .done(function(data) {
                    console.log("success");
                    Grid.soData = $.parseJSON(data);
                    // Grid.soData.push({
                    //     sono: '777',
                    //     shipvia: 'NONE'
                    // });
                })
                .fail(function() {
                    console.log("error");
                });

        }
    }
});
