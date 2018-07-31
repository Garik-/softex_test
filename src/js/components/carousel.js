// @flow
'use strict';

let carouselItem = {
    name: 'carousel-item',
    props: ['item', 'index'],
    data: function () {

        let style = {
            'background-image': 'url(' + this.item.src + ')',
            'position': 'absolute',
            'left': '0%'
        };

        let data = { 'style': style };
        return data;
    },
    mounted: function () {
        if (0 != this.index) {
            let $item = document.querySelectorAll('.carousel .carousel-cell')[this.index - 1];
            this.style['left'] = this.index * $item.offsetWidth + 'px';
        }
    },
    template: '<div class="carousel-cell" :style="style"><div class="carousel-cell--content">\
    <a class="btn secondary" href="https://github.com/Garik-/">View on GitHub</a>\
    </div></div>'
};

export default {
    name: 'carousel',
    props: ['items'],
    components: {
        'carousel-item': carouselItem
    },
    data: function () {
        let data = {
            'current': 0,
            'slidesToShow': 1,
            'responsive': [{
                'breakpoint': 992,
                'settings': {
                    'slidesToShow': 3
                }
            }],
            'position': {
                'left': '0%',
                'transform': 'translateX(0%)'
            }
        };

        return data;
    },
    template: '<div class="carousel"><div class="carousel-viewport"><div class="carousel-slider" :style="position">\
    <template v-for="(item, index) in items"><carousel-item :item="item" :index="index"></carousel-item></template>\
    </div></div><div class="carousel-nav"><span v-on:click="prev" class="btn">&lt;</span><span class="btn" v-on:click="next">&gt;</span></div></div>',
    methods: {
        prev: function () {
            if (this.current > 0) {
                this.current--;
            }
            else {
                this.current = this.items.length - this._slidesToShow();
            }

            this._move(this.current);
        },
        next: function () {
            if (this.current < this.items.length - this._slidesToShow()) {
                this.current++;
            }
            else {
                this.current = 0;
            }

            this._move(this.current);
        },
        _move: function (index) {
            let $item = document.querySelectorAll('.carousel .carousel-cell')[index];
            this.position.transform = 'translateX(-' + $item.style.left + ')';
        },
        _slidesToShow: function () {
            let show = this.slidesToShow,
                width = document.body.clientWidth;

            if (this.responsive) {
                this.responsive.forEach(item => {
                    if (width > item.breakpoint) {
                        show = item.settings.slidesToShow;
                    }
                });
            }

            return show;
        }
    }

};
