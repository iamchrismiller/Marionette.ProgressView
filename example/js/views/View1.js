var View1 = Marionette.ItemView.extend({

  template : '#view1Template',

  triggers : {
    "click .next" : "next:item"
  }
});