/*!
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 1.2.2
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 */

(function ($, window) {
  var $window = $(window);
  /**
   * Makes a nice constellation on canvas
   * @constructor Constellation
   */
  function Constellation(canvas, options) {
    var $canvas = $(canvas),
      context = canvas.getContext('2d'),
      defaults = {
        star: {
          // star's attributes
          color: 'rgba(255, 255, 255, .5)',
          width: 1,
          randomWidth: true
        },
        line: {
          // stars間的lines的attributes
          color: 'rgba(255, 255, 255, .5)',
          width: 0.2
        },
        position: {
          // 滑鼠cursor的位置，不需設定
          x: 0,
          y: 0
        },
        width: window.innerWidth,   // width of canvas
        height: window.innerHeight, // height of canvas
        velocity: 0.1,    // stars的移動速度
        velocityChaos: 8e-4,    // stars的移動方向，多大的機率會被改變
        length: 100,      // 畫面上有多少stars
        distance: 120,    // 兩個stars間隔多遠以內，就要連線
        radius: 150,      // 以滑鼠位置為圓心，多大的範圍內要highlight lines
        initStars: [],    // 指定一開始stars的位置
        stars: []         // 存Star物件的array，不須設定
      },
      config = $.extend(true, {}, defaults, options);

    function Star(x, y) {
      this.x = x || (Math.random() * canvas.width);
      this.y = y || (Math.random() * canvas.height);

      this.vx = config.velocity * (Math.random() - 0.5);
      this.vy = config.velocity * (Math.random() - 0.5);

      this.radius = config.star.randomWidth ? (Math.random() * config.star.width) : config.star.width;
    }

    Star.prototype = {
      draw: function () {
        // 畫一個圓形
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      },

      animate: function () {
        var i;
        // 對所有的stars跑
        for (i = 0; i < config.length; i++) {

          var star = config.stars[i];

          // 撞牆才改變速度，待優化
          if (star.y < 0 || star.y > canvas.height || Math.random() < config.velocityChaos) {
            star.vy = - star.vy;
          }
          if (star.x < 0 || star.x > canvas.width || Math.random() < config.velocityChaos) {
            star.vx = - star.vx;
          }

          star.x += star.vx;
          star.y += star.vy;
        }
      },

      line: function () {
        // 畫stars間的lines
        var length = config.length,
          iStar,
          jStar,
          i,
          j;

        for (i = 0; i < length; i++) {
          for (j = 0; j < length; j++) {
            iStar = config.stars[i];
            jStar = config.stars[j];

            if (
              (iStar.x - jStar.x) < config.distance &&
              (iStar.y - jStar.y) < config.distance &&
              (iStar.x - jStar.x) > - config.distance &&
              (iStar.y - jStar.y) > - config.distance
            ) {
              if (
                (iStar.x - config.position.x) < config.radius &&
                (iStar.y - config.position.y) < config.radius &&
                (iStar.x - config.position.x) > - config.radius &&
                (iStar.y - config.position.y) > - config.radius
              ) {
                context.beginPath();
                context.moveTo(iStar.x, iStar.y);
                context.lineTo(jStar.x, jStar.y);
                context.stroke();
                context.closePath();
              }
            }
          }
        }
      }
    };

    this.createStars = function () {
      var length = config.length;
      var initStars = config.initStars;
      var i;

      for (i = 0; i < initStars.length && i < length; i++) {
        var starPosition = initStars[i];
        var x = starPosition.x * window.innerWidth;
        var y = starPosition.y * $canvas.height() + $canvas.height() / 2;
        config.stars.push(new Star(x, y));
      }

      for (; i < length; i++) {
        config.stars.push(new Star());
      }
    }

    this.animateStars = function () {
      var length = config.length;
      var star;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < length; i++) {
        star = config.stars[i];
        star.draw();
      }

      star.line();
      star.animate();
    };

    this.setCanvas = function () {
      canvas.width = config.width;
      canvas.height = config.height;
    };

    this.setContext = function () {
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;
    };

    this.setInitialPosition = function () {
      if (!options || !options.hasOwnProperty('position')) {
        config.position = {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5
        };
      }
    };

    this.loop = function (callback) {
      callback();

      this.rAF = window.requestAnimationFrame(function () {
        this.loop(callback);
      }.bind(this));
    };

    this.handlers = {
      window: {
        mousemove: function (e) {
          config.position.x = e.pageX - $canvas.offset().left;
          config.position.y = e.pageY - $canvas.offset().top;
        },
        resize: function () {
          window.cancelAnimationFrame(this.rAF);
        }
      }
    };

    this.bind = function () {
      $window
        .on('mousemove', this.handlers.window.mousemove)
        .on('resize', this.handlers.window.resize.bind(this));
    };

    this.unbind = function () {
      $window
        .off('mousemove', this.handlers.window.mousemove)
        .off('resize', this.handlers.window.resize);
    }

    this.init = function () {
      this.setCanvas();
      this.setContext();
      this.createStars();
      this.setInitialPosition();
      this.loop(this.animateStars);
      this.bind();
    };
  }

  function instantiate(element, options) {
    var c = new Constellation(element, options);
    c.init();
  }

  $.fn.constellation = function (options) {
    return this.each(function () {
      $window.on('resize', function () {
        instantiate(this, options);
      });

      instantiate(this, options);
    });
  };
})($, window);
