$(function () {
  // createBannerCanvas();

  initMileStone();

  $('form#contact-form').submit(onSubmitContactForm);

  function createBannerCanvas() {
    var pointRadius = 3
    var color = '#3186e3'
    var ICON_SIZE = 75
    var SCALE_X = 0.8;
    var SCALE_Y = 0.8;

    var canvas = this.__canvas = new fabric.Canvas('banner-canvas', {
      width: window.innerWidth * 0.95,
      height: window.innerWidth * 0.95 * 586 / 1565,
      hoverCursor: 'pointer',
      hasControls: false,
      selection: false
    });

    fabric.Image.fromURL("assets/about/about-banner-bg.png", function (img) {
      // add background image
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });
    });

    fabric.Image.fromURL("assets/about/about-banner-people.png", function (img) {
      img.set({
        // scaleX: ICON_SIZE / img.width,
        // scaleY: ICON_SIZE / img.height,
        left: canvas.width - 270,
        top: 0,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        selectable: false,
        hoverCursor: 'default',
      });
      canvas.add(img)
    });

    canvas.on('object:selected', function (e) {
      var link = e.target.link
      window.open(link, '_blank')
    });

    function makePoint(x, y) {
      var point = new fabric.Circle({
        left: x,
        top: y,
        strokeWidth: 0,
        radius: pointRadius,
        fill: color,
        selectable: false,
        evented: false
      });
      return point
    }

    function addLine(p1, p2) {
      var line = new fabric.Line([
        p1.left + pointRadius / 2,
        p1.top + pointRadius / 2,
        p2.left + pointRadius / 2,
        p2.top + pointRadius / 2
      ], {
          stroke: color,
          strokeWidth: 2,
          selectable: false,
          evented: false
        }
      )
      canvas.add(line)
    }

    function addLinkIcon(position, iconPath, linkHref) {
      fabric.Image.fromURL(iconPath, function (img) {
        img.set({
          scaleX: ICON_SIZE / img.width,
          scaleY: ICON_SIZE / img.height,
          left: position[0] - ICON_SIZE / 2,
          top: position[1] - ICON_SIZE / 2,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          // borderColor: 'transparent',   // 可看是否要這行效果
          link: linkHref
        });
        canvas.add(img)
      });
    }

    var graph = [
      // pos: 該點的位置; 暫時使用SCALE_X及SCALE_Y來控制rwd scale，待improve
      // relation: 該點跟哪些點有連線，目前只記錄往前面index點的連線
      { pos: [0 * SCALE_X, 233 * SCALE_Y], relation: [] },    // 0
      { pos: [47 * SCALE_X, 238 * SCALE_Y], relation: [0] },    // 1
      { pos: [92 * SCALE_X, 240 * SCALE_Y], relation: [1] },    // 2
      { pos: [0 * SCALE_X, 290 * SCALE_Y], relation: [1] },    // 3
      { pos: [28 * SCALE_X, 389 * SCALE_Y], relation: [1, 2] },    // 4
      { pos: [0 * SCALE_X, 388 * SCALE_Y], relation: [4] },    // 5
      { pos: [180 * SCALE_X, 312 * SCALE_Y], relation: [2, 4] },    // 6
      { pos: [245 * SCALE_X, 165 * SCALE_Y], relation: [2, 6] },    // 7
      { pos: [232 * SCALE_X, 308 * SCALE_Y], relation: [6, 7] },    // 8
      { pos: [347 * SCALE_X, 162 * SCALE_Y], relation: [7, 8] },    // 9
      { pos: [364 * SCALE_X, 337 * SCALE_Y], relation: [9, 8] },    // 10
      { pos: [392 * SCALE_X, 166 * SCALE_Y], relation: [9, 10] },    // 11
      { pos: [524 * SCALE_X, 227 * SCALE_Y], relation: [10, 11] },    // 12
      { pos: [507 * SCALE_X, 130 * SCALE_Y], relation: [11, 12] },    // 13
      { pos: [578 * SCALE_X, 295 * SCALE_Y], relation: [10, 12] },    // 14
      { pos: [650 * SCALE_X, 148 * SCALE_Y], relation: [12, 13, 14] },    // 15
      { pos: [616 * SCALE_X, 439 * SCALE_Y], relation: [14, 10] },    // 16
      { pos: [692 * SCALE_X, 252 * SCALE_Y], relation: [14, 15, 16] },    // 17
      { pos: [716 * SCALE_X, 125 * SCALE_Y], relation: [15, 17] },    // 18
      { pos: [751 * SCALE_X, 460 * SCALE_Y], relation: [16, 17] },    // 19
      { pos: [845 * SCALE_X, 105 * SCALE_Y], relation: [18] },    // 20
      { pos: [895 * SCALE_X, 231 * SCALE_Y], relation: [20, 18, 17] },    // 21
      { pos: [893 * SCALE_X, 366 * SCALE_Y], relation: [21, 19, 17] },    // 22
      { pos: [1047 * SCALE_X, 172 * SCALE_Y], relation: [21, 20] },    // 23
      { pos: [1081 * SCALE_X, 264 * SCALE_Y], relation: [23, 22, 21] },    // 24
      { pos: [1055 * SCALE_X, 441 * SCALE_Y], relation: [24, 22] },    // 25
      { pos: [1135 * SCALE_X, 242 * SCALE_Y], relation: [25, 24, 23] },    // 26
      { pos: [1221 * SCALE_X, 170 * SCALE_Y], relation: [26, 23] },    // 27
      { pos: [1209 * SCALE_X, 302 * SCALE_Y], relation: [27, 26, 25] },    // 28
      { pos: [1222 * SCALE_X, 449 * SCALE_Y], relation: [28, 25] },    // 29
      { pos: [1280 * SCALE_X, 120 * SCALE_Y], relation: [27] },    // 30
      { pos: [1289 * SCALE_X, 335 * SCALE_Y], relation: [29, 28, 27] },    // 31
    ]

    for (var i = 0; i < graph.length; i++) {
      // 先把該點畫出來
      graph[i].point = makePoint(graph[i].pos[0], graph[i].pos[1])
      canvas.add(graph[i].point)
      //再用for迴圈畫出所有連線
      for (var j = 0; j < graph[i].relation.length; j++) {
        var relatedPoint = graph[i].relation[j] // 獲取線段的另一端點index
        addLine(graph[i].point, graph[relatedPoint].point)
      }
    }

    addLinkIcon([232 * SCALE_X, 308 * SCALE_Y], 'assets/test.png', "https://www.google.com")
    addLinkIcon([350 * SCALE_X, 170 * SCALE_Y], 'assets/test.png', "https://www.google.com")
    addLinkIcon([578 * SCALE_X, 295 * SCALE_Y], 'assets/test.png', "https://www.google.com")
    addLinkIcon([716 * SCALE_X, 135 * SCALE_Y], 'assets/test.png', "https://www.google.com")
    addLinkIcon([751 * SCALE_X, 460 * SCALE_Y], 'assets/test.png', "https://www.google.com")
    addLinkIcon([895 * SCALE_X, 231 * SCALE_Y], 'assets/test.png', "https://www.google.com")
    addLinkIcon([1047 * SCALE_X, 172 * SCALE_Y], 'assets/test.png', "https://www.google.com")
    addLinkIcon([1055 * SCALE_X, 441 * SCALE_Y], 'assets/test.png', "https://www.google.com")
  }

  function initMileStone() {
    var milestoneVivus = new Vivus('milestone-svg', {
      type: 'oneByOne',   // 讓線條照順序出現
      duration: 150,      // 總時間為150 animationFrame
      start: 'manual'     // 手動控制何時開始此動畫
    }, showMileStoneText);    // 動畫結束後的callback

    $(window).scroll(tryPlayMileStone);

    $('#milestone-svg')[0].addEventListener('load', function () {
      hideMilestoneText()
      tryPlayMileStone()
    }, true);

    function tryPlayMileStone() {
      var svgPosY = $('#milestone-svg').offset().top;
      var svgMarginY = parseInt($('#milestone-svg').css('margin-top'));
      var windowHeight = $(window).height();

      if ($(this).scrollTop() > (svgPosY - svgMarginY - windowHeight)) {
        milestoneVivus.play();
      }
    }
    function hideMilestoneText() {
      var $svg = $('#milestone-svg')
      $svg.find('text.fade-in').css({ opacity: 0 });
    }
    function showMileStoneText() {
      var $svg = $('#milestone-svg')
      $svg.find('text.fade-in').animate({ opacity: 1 }, 'slow', 'swing');
    }
  }

  function onSubmitContactForm(event) {
    event.preventDefault()
    var form = $('form#contact-form')[0]
    $.ajax({
      url: form.action,
      method: form.method,
      data: {
        _subject: 'BiiLabs Official Website Contact Form from ' + $('#client_name').val(),
        _replyto: $('#client_email').val(),
        name: $('#client_name').val(),
        email: $('#client_email').val(),

        comments: $('#client_content').val(),
      },
      dataType: "json",
      success: function (a, b, c) {
        alert('寄送成功！')
      },
      fail: function (a, b, c) {
        alert('發生了一些錯誤，請稍後再試！')
      }
    });
  }

})

function setLocaleCallback() {
  $('#milestone-svg').find('text[data-i18n]').each(function (idx, item) {
    var $dom = $(item)
    var text = $.i18n($dom.data('i18n'))
    $dom.html(text)
  })
}
