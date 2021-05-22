function ParallexElement($ele) {
    this.$ele = $ele;
    this.elePosY = $ele.offset().top;
    this.elePosX = $ele.offset().left;
    this.imgHeight = $ele.find('img').height();
    this.eleHeight = $ele.height();
    this.eleWidth = $ele.innerWidth();
}

function Parallex() {
    this.elements = []
    $(window).scroll(this.onScroll.bind(this))
}
Parallex.prototype.onScroll = function onScroll() {
    console.log("onScroll!", this)
    var windowScrollTop = $(window).scrollTop();
    for (var i = 0; i < this.elements.length; i++) {
        this.onScrollEle(this.elements[i], windowScrollTop)
    }
}
Parallex.prototype.onScrollEle = function onScrollEle(parallexElement, windowScrollTop) {
    var $ele = parallexElement.$ele;
    var elePosY = parallexElement.elePosY;
    var elePosX = parallexElement.elePosX;
    var imgHeight = parallexElement.imgHeight;
    var eleHeight = parallexElement.eleHeight;
    var eleWidth = parallexElement.eleWidth;
    console.log("onScrollEle", "windowScrollTop", windowScrollTop, "elePosY", elePosY, "eleHeight", eleHeight, "imgHeight", imgHeight)

    if (windowScrollTop < elePosY) {
        console.log("not into yet")
        $ele.css('align-items', 'flex-start');
        $ele.css('position', 'static');
    }
    else if (windowScrollTop > elePosY + eleHeight - imgHeight) {
        console.log("scroll complete")
        $ele.css('align-items', 'flex-end');
        $ele.css('position', 'static');
    }
    else {
        console.log("change to fixed")
        $ele.css('top', '0px');
        $ele.css('left', elePosX + 'px');
        $ele.css('width', eleWidth + 'px');
        $ele.css('position', 'fixed');
    }
}
Parallex.prototype.reset = function reset() {
    this.elements = []
}

$.fn.parallex = function () {
    if (!window.parallex) window.parallex = new Parallex()
    this.each(function () {
        var $ele = $(this);
        var img = $ele.find('img')
        console.log("each", $ele, img)
        img.imagesLoaded( function () {
            console.log("paral into", Date.now(), $ele)
            var parallexElement = new ParallexElement($ele)
            window.parallex.elements.push(parallexElement)
            window.parallex.onScroll()
        });
    })
};

if (!window.parallex) window.parallex = new Parallex()
