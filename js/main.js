var myThings = [
  { sono: '1112', text: 'myItem one9'},
  { sono: '1113', text: 'my item two9'},
  { sono: '1114', text: 'another item9'}
];

Vue.component('sono-item', {
  props: ['sono'],
  template: '<li><strong>{{sono.sono}}</strong>  {{ sono.text }}</li>'
})

var app4 = new Vue({
  el: '#so-list',
  data: {
    sonoItems: myThings
  }
});
