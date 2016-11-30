var soList;
soList = [];

Vue.component('sono-list', {
    props: {
        data: Array,
        selectedcolumns: Array
    },
    template: '#grid-template',
    computed: {
        columns: function() {
            // return specified list if it is supplied
            if (Array.isArray(this.selectedcolumns)) {
                return this.selectedcolumns;
            }
            // otherwise show all keys
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

var MyColumns = ['sono', 'customercode', 'shipto', 'reqdate', 'reqtime', 'estskidcnt', 'shipvia', 'sotype', 'load'];
var Grid = new Vue({
    el: '#so-list',
    data: {
        soData: soList,
        soColumns: MyColumns
    },
    methods: {
        refreshGrid: function() {
            $.ajax({
                    url: './php/GetSOList.php',
                    data: {}
                })
                .done(function(data) {
                    console.log("success");
                    Grid.soData = $.parseJSON(data);
                    // Grid.refreshTime = 'hey';
                })
                .fail(function() {
                    console.log("error");
                });

        },
        returnOnly: function(value) {
            value.filter(function(value) {
                return true;
            });
            // return value.sotype == 'R' ? true : false;
            // return value.filter(function(number) {
            //     return number % 2 === 0;
            // });
        }
    }
});

$(document).ready(function() {
    Grid.refreshGrid();
});
