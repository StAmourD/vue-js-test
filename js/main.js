Vue.component('currency-input', {
    // <input v-bind:value="value" v-on:input="updateValue($event.target.value)" >
    template: '<div>' +
        '<input type="checkbox" v-bind:value="test" v-on:change="updateValue" v-bind:checked="isChecked">' +
        '<input type="checkbox" value="test111" v-on:change="updateValue2" v-bind:checked="isChecked">' +
        '<p>child: {{checked}}</p><p>test: {{test}}</p></div>',
    props: ['checked', 'test'],
    computed: {
        isChecked: function() {
            return this.checked;
        }
    },
    methods: {
        updateValue: function(value) {
            this.$emit('input', value);
        },
        updateValue2: function(value) {
            this.$emit('input2', value);
        }
    }
});

var app;
app = new Vue({
    el: '#app',
    data: {
        price: 10,
        pchecked: true
    },
    methods: {
        select: function(e) {
            // alert(e.target.checked);
            this.pchecked = e.target.checked;
        },
        select2: function(e) {
            alert(e.target.checked + 'other box');
            // this.pchecked = e.target.checked;
        }
    }
});
