import {Zepto} from '../zepto/zepto.js';

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDYzYTY5ZTMtN2RmMy02ODRhLWEwYzQtZjJlODlmZGM2NWQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1NjJBMDEyNjA2QTExRTY5NzgxRjM0MzJDODI3MTBEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1NjJBMDExNjA2QTExRTY5NzgxRjM0MzJDODI3MTBEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNGOENFNDBGNjA2QTExRTZBMjEzOEY0MUJCODNCQUY0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNGOENFNDEwNjA2QTExRTZBMjEzOEY0MUJCODNCQUY0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAOgA6AwERAAIRAQMRAf/EAHsAAAICAwEAAAAAAAAAAAAAAAUGBAcAAQIDAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMBBAUHCAsBAAAAAAABAgMABAURITESBkFRIjITYXFSYoJDFPCBscHRojM0kaHxciNjg0SEFTVFEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC4bu/5gu+Z8hYWuTNjbWvG+uzgSONQSdANSdtBkOXykRBi5ksrw+hcqy6+0RsoDdhzFxyRwZKEWksp4YbhHElrK3QFlGxWPU1AaIIOh2GgG5TOW1gyQLG93fyjiisoRq5HpN6K+U0AG6zHMcraSZDH4lTui8RZJB5yOKgH5K95ns7E5CHPLewK4jcwMCFcjUBgVoHX4qXyfkPid3vfl0UCvewmDnDJIRp8dYzNGesmPU/rSgSk0KL5hQSLW7mtuIR6NDJsmt22xyDqYfXvFBYOIzo/0Us7EzPaqvgcR7Ugk7MSsfSDdhvNrQJORydy8s8SSk+IxN3Ouxp5Bv1O/gXci7tKAaFUbgBQGbZGflkWyjVr3JIiDr4U0P00FmfDJ1+6+G9mgCc0WFwy22Vs08S8xrcZiG+SE99f0UFfX9vHDPxwHjs59ZLWToKHbw/vJuYUEegNYu4kTHqoPZDTMf6SeKv3jQBF3Cg7RJJJFjjUvK54UQbyT0UDryvi/FubaXY1jig4jkHdmu5Nsjr1qndB8lA3UGwSNo30C5ncLhkLP4y2stweJrUp4screkIV7St6y6UCpJjLESEMpiHQRPGAfZkBYUEu1tIEhijjieWB/iPFn8aP+HxRhejs7tu2ggjGWmg4EkkPoi4t/wBtAewmIwssogkuBDK47VmA8csg6VMsnaZfImlA4xxRxRrFEgjjjHCkajRVA6AKDdAPzeUbH2qeAglvrlxBZQnc0jdLequ80Fd5TIyvcTRxzNJqSJ7rc87jedehNe6o2aUA3hHVQFrFCca2g3i5PzeGo+qgEhV03Cgk2940YEUwM1prq8JJ1HrRtvRx0EUD7y1mZnmbFXkvjTJGJrK7Owz27DUE+so30DBQKObuml5ju23piMfI8Y6pZF018/aoEdRooHVQdxxySSLFGpeRzwog3k9VA64TD8eEuXQCXhASDT3nhktMV8jMSq+agTLm3a3mMROo70b9DIe6woPOgOQXD2+OweUXY9pcy25P8sMG0+8aCy9Y+sbuP2Ougr68yNha8zZ+HIGRbe8DQccQDOuvCQQDQQFg5UY8MMuQun6Io4kUn5+1QHcVy1cT961/1Vgw0l4m47yZfRL+7U9OlA4RpHFGkcSiOOMBY0XYFUbgKBfzfLQnLTW0CXEbsXksmbwyGPee3kHcZulT2TQKs2LwcUhS6nvcc43x3MAcD20OhoOMvdYiLAwY2wuzeOk8lw8hQxgcS6BQDQWBxP5f+Xr7X20EfKfmf/O3D81+L89BPx3c/tf8X5bqCQaDVBlBq4/A93/kdygBp+YX/kd4bu9v+mgP/bQf/9k="
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
        settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            //fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            //fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(Zepto, window, document);
