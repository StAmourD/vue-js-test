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

var MyColumns = ['sono', 'customercode', 'shipto', 'reqdate', 'reqtime', 'estskidcnt', 'reqtime', 'shipvia', 'sotype', 'load'];
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
                })
                .fail(function() {
                    console.log("error");
                });

        }
    }
});
