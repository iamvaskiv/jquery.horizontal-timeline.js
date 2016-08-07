;(function ($) {
  var defaults = {
    itemWidth: 200
  };

  //constructor
  function Timeline(elem, options) {
    this.el = elem;

    // Merge the options given by the user with the defaults
    this.options = $.extend({}, defaults, options);

    this.init();
  }

  Timeline.prototype = {
    init: function () {
      this.$el = $(this.el);
      this.line = this.$el.find('.timeline-wrapper');
      this.items = this.$el.find('li');

      this.build();
    },

    build: function () {
      var base = this;
      base.dates = base.getDates();

      // TODO: need to correct dayWidth
      base.dayWidth = base.dates.length - 1;

      console.log(base.dayWidth);

      base.items.each(function (i) {
        var item = $(this),
            dayDiff = (i > 0) ? base.getDayDiff(base.dates[0], base.dates[i]) : 0;

        base.itemLeft = (i * base.options.itemWidth) + ((dayDiff - i) * base.dayWidth);

        item.css({
          width: base.options.itemWidth,
          left: base.itemLeft + 'px'
        });
      });

      base.line.css({width: base.itemLeft + base.options.itemWidth + 'px'});
    },

    getDates: function () {
      var date = '',
          temp = [];

      for (var i = 0; i < this.items.length; i++) {
        date = $(this.items[i]).data('date');
        temp.push(this.parseDate(date));
      }

      return temp;
    },

    getDayDiff: function (first, last) {
      return Math.round((last-first)/(1000*60*60*24));
    },

    parseDate: function (str) {
      var mdy = str.split('/');
      return new Date(mdy[2], mdy[0]-1, mdy[1]);
    }
  };

  /* Create a lightweight plugin wrapper around the "Plugin" constructor,
   preventing against multiple instantiations.
  ------------------------------------------- */
  $.fn.timeline = function (options) {
    this.each(function () {
      if (!$.data(this, "plugin_timeline")) {
        $.data(this, "plugin_timeline", new Timeline(this, options));
      }
    });

    return this;
  };
}(jQuery));

$('.timeline').timeline();
