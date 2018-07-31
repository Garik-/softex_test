/* @flow */
'use strict';

import Vue from 'vue';
import Component_navigation from './components/navigation.js';
import Component_carousel from './components/carousel.js';

export default new Vue({
  el: '#app',
  data: {
    'items': [
      {
        'name': 'Home',
        'href': '#'
      },
      {
        'name': 'About Us',
        'href': '#'
      },
      {
        'name': 'Contact Us',
        'href': '#'
      }
    ],
    'images': [
      { 'src': 'img/bg-01.jpg' },
      { 'src': 'img/bg-02.jpg' },
      { 'src': 'img/bg-03.jpg' },
      { 'src': 'img/bg-03.jpg' },
      { 'src': 'img/bg-02.jpg' },
      { 'src': 'img/bg-01.jpg' }
    ]
  },
  components: {
    'navigation': Component_navigation,
    'carousel': Component_carousel
  }
});