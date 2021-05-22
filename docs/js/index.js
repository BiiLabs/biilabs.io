$(function () {
  var $constellationelCanvas = $('canvas#banner-constellationel')

  // Init plugin
  $constellationelCanvas.constellation({
    star: {
      color: 'rgb(58, 125, 208)',
      width: 3.5,
      randomWidth: false
    },
    line: {
      color: 'rgb(68, 135, 218)',
    },
    velocity: 0.5,
    width: $constellationelCanvas.width(),
    height: $constellationelCanvas.height(),
    length: $constellationelCanvas.width() / ($constellationelCanvas.width() * 20 / 960 + 0),
    // length: 40,
    radius: $constellationelCanvas.width(),
    distance: $constellationelCanvas.width() / 6.5,
    initStars: [
      { "x": 0.03359375, "y": -0.41 },
      { "x": 1.14375, "y": 0.316 },
      { "x": 0.0265625, "y": -0.218 },
      { "x": 1.14140625, "y": 0.104 },
      { "x": 0.0109375, "y": 0.042 },
      { "x": 1.1390625, "y": -0.186 },
      { "x": 0.16640625, "y": -0.402 },
      { "x": 1.125, "y": -0.06 },
      { "x": 0.159375, "y": -0.212 },
      { "x": 1.02734375, "y": 0.314 },
      { "x": 0.0640625, "y": -0.036 },
      { "x": 1.0671875, "y": -0.022 },
      { "x": 0.1265625, "y": -0.082 },
      { "x": 1.01015625, "y": 0.11 },
      { "x": 0.1765625, "y": 0.09 },
      { "x": 1.0171875, "y": -0.19 },
      { "x": 0.1828125, "y": 0.12 },
      { "x": 0.96015625, "y": 0.104 },
      { "x": 0.353125, "y": -0.274 },
      { "x": 0.98515625, "y": -0.208 },
      { "x": 0.35703125, "y": -0.26 },
      { "x": 0.8328125, "y": 0.17 },
      { "x": 0.378125, "y": -0.094 },
      { "x": 0.81875, "y": 0.17 },
      { "x": 0.35234375, "y": -0.006 },
      { "x": 0.796875, "y": -0.01 },
      { "x": 0.4484375, "y": 0.04 },
      { "x": 0.834375, "y": -0.086 },
      { "x": 0.409375, "y": 0.218 },
      { "x": 0.77421875, "y": -0.32 },
      { "x": 0.5234375, "y": -0.438 },
      { "x": 0.728125, "y": -0.128 },
      { "x": 0.53359375, "y": -0.236 },
      { "x": 0.659375, "y": 0.352 },
      { "x": 0.4890625, "y": 0.304 },
      { "x": 0.64296875, "y": 0.134 },
      { "x": 0.59296875, "y": -0.046 },
      { "x": 0.6875, "y": -0.392 },
      { "x": 0.56875, "y": 0.192 },
      { "x": 0.61015625, "y": -0.294 }
    ]
  });

  $('#section-latest-news .autoplay').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive:[
      {
        breakpoint: 992,
        settings: "unslick",
      }
    ]
  });
})
