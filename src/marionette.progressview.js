/*jshint*/
/*global Backbone,define*/

;(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['marionette','jquery','underscore'], factory);
  } else {
    // Browser globals
    root.Marionette.ProgressView = factory(root.Marionette,root.jQuery,root._);
  }
}(this, function (Marionette,$,_) {
  "use strict";

  var ProgressView = Marionette.View.extend({

  });

  return ProgressView;
}));
