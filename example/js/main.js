var ProgressView = Marionette.ProgressView.extend({

  template : "#progressTemplate",

  ui : {
    "content"  : ".content",
    "progress" : ".progress .bar"
  },

  viewContainer : ".content",

  views : [View1, View2, View3],

  onProgress : function (completion) {
    //bootstrap progress bar
    this.$(this.ui.progress).width(completion + "%");
  },

  onComplete : function () {
    this.$(this.ui.content).html("<h1>Completed View Series</h1>");
  }
});

var app = new Marionette.Application();
app.addRegions({ main : "#main"});
app.main.show(new ProgressView());