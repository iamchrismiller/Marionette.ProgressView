var View2 = Marionette.ItemView.extend({

  template : '#view2Template',

  triggers : {
    "click .next" : "next:item"
  }

});