({
  baseUrl: 'widget-enme',

  out: 'build/main.min.js',
  optimize: 'uglify2',

  name: '../components/almond/almond',
  include: ['main'],
  //exclude: ['coffee-script'],
  //stubModules: ['cs', 'text'],
  wrap: true,

  paths: {
    // backbone: 'libs/backbone-amd',
    // underscore: 'libs/underscore-amd',
    // jquery: 'libs/jquery',
    // cs: 'libs/cs',
    // 'coffee-script': 'libs/coffee-script',
    // text: 'libs/text'
  }
})