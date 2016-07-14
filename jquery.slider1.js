/**
 * Created by Ksu on 14.07.2016.
 */
(function ($) {
    $.fn.courusel = function (node, options) {

        var defaults = {
            images:["img/bike.gif","img/ch01.jpg","img/ch02.jpg","img/ch03.jpg"],
            delay: 5000,
            auto: true
        };
        var settings = $.extend(defaults, options);

        /// image control block
        function moveTo(placeOrder) {
            $('.activeSlider').each(function (i, item) {
                $(item).removeClass('activeSlider');
            });

            var n = parseInt(placeOrder);

            if (!n) {
                n = 0;
            } else {
                if (n >= settings.images.length) {
                    n = 0
                } else if (n < 0) {
                    n = settings.images.length - 1;
                }
            }

            var activeSlide = $('.item')[n];
            var activeCheck = $('.radiobtn')[n]

            $(activeSlide).addClass('activeSlider');
            activeCheck.checked = true
        }

/// utils block

        function getCurrentSlideOrder() {
            var _itemObj = $('.activeSlider')[0];
            return parseInt($(_itemObj).attr('data-order_img'));
        }

        function shiftRorL(order, shift) {
            if (shift) {
                moveTo(order + 1)
            }
            moveTo(order - 1)
        }

/// binding actions block
// set bindings with Bind()

        function setActionOnControls() {
            $(document).on('click', '#left', function () {

                shiftRorL(getCurrentSlideOrder(), 1)
            });
            $(document).on('click', '#right', function () {
                shiftRorL(getCurrentSlideOrder(), 0)
            });
//Stop action
            $(document).on('click', '.item', function () {
                settings.auto = false;
                start()
            });
//Start
            $(document).on('dblclick', '.item', function () {
                settings.auto = true;
                start()
            });

            $(document).on('click', '.radiobtn', function (e) {
                var _trgt = $(e.target);
                var _img_order = $(_trgt).attr('data-order_img');
                moveTo(_img_order)
            })
        }


/// defaults rendering block
// Add custom image list from options

        function renderSlider() {
            var sliderRoot = $(node);

            var leftDiv = document.createElement('div');
            var leftButt = document.createElement('button');
            $(leftButt).attr({'id': 'left','class':'button'});
            $(leftButt).text('<');
            $(leftDiv).append(leftButt);


            var rightDiv = document.createElement('div');
            var rightButt = document.createElement('button');
            $(rightButt).attr({'id': 'right','class':'button'});
            $(rightButt).text('>');
            $(rightDiv).append(rightButt);


            var radioPullDiv = document.createElement('div');
            $(radioPullDiv).attr('id', 'radio_pull');


            settings.images.forEach(function (image_src, i) {

                var itm = document.createElement('div');
                $(itm).attr({'class': 'item', "data-order_img": i});
                if (i == 0) {
                    $(itm).addClass('activeSlider');
                }

                var _inp = document.createElement('input');
                $(_inp).attr({
                    'class': 'radiobtn', 'type': 'radio',
                    'data-order_img': i, 'name':'btn'
                });
                if (i == 0) {
                    $(_inp).attr('checked',true);
                }

                var _img = document.createElement('img');
                $(_img).attr('src', image_src);

                $(radioPullDiv).append(_inp);
                $(itm).append(_img);
                $(sliderRoot).append(itm);

            });
            $(sliderRoot).append(leftDiv, rightDiv, radioPullDiv);
        }

///Start sliders auto show
// add ability to stop by setting checkbox, for example.
        function start() {
            var state = settings.auto;
            if (state) {
                _timer = window.setInterval(function () {
                    moveTo(getCurrentSlideOrder() + 1)
                }, settings.delay)
            } else {
                clearInterval(_timer)
            }
        }


///Initialize keystone modules
//  maybe move image initializing and
//  radio buttons mapping to other place

        function init() {
            renderSlider();
            setActionOnControls();
            start();
        }

        init();
        return this
    }
})
(jQuery);