var View3 = Marionette.ItemView.extend({

  template : '#view3Template',

  triggers : {
    "click .prev" : "prev:item",
    "click .next" : "next:item"
  }

});