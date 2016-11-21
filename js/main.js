var myThings = [
  { sono: '1112', custno: 'myItem one9', shipvia: '1myItem one9'},
  { sono: '1113', custno: 'my item two9', shipvia: '1myItem one9'},
  { sono: '1114', custno: 'another item9', shipvia: '1myItem one9'}
];

Vue.component('sono-item', {
  props: {
    data: Array
  },
  template: '#grid-template',
  computed: {
    columns: function () {
      var keys = [];
      for(var key in this.data[0]) {
        if (this.data[0].hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys
    }
  }
})

var app = new Vue({
  el: '#so-list',
  data: {
    soData: myThings
  }
});
