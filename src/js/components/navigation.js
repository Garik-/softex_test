// @flow
'use strict';

export default {
    name: 'navigation',
    props: ['items'],
    template: '<header><ul class="navigation">\
    <li v-for="item in items" class="navigation__item">\
        <a class="navigation__item--link" :href="item.href">{{ item.name }}</a>\
    </li>\
</ul></header>'
};
