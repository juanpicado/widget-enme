define(function (form) {
   var domain = __enme_widget.host;
   var fn = {
        box_dimensions: {
              DEFAULT_HEIGHT: "600",
              DEFAULT_WIDTH: "520",
              NARROW_WIDTH: "320",
              MIN_WIDTH: "180",
              MIN_HEIGHT: "200",
              WIDE_MEDIA_PADDING: 81,
              NARROW_MEDIA_PADDING: 16,
              WIDE_MEDIA_PADDING_CL: 60,
              NARROW_MEDIA_PADDING_CL: 12
      },
      cssStyle: domain + "resources/css/dev/embebed/form.css"
   };

   return fn;
});