/*jshint*/
/*global Marionette,define*/

;(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['marionette','underscore'], factory);
  } else {
    // Browser globals
    root.Marionette.ProgressView = factory(root.Marionette,root._);
  }
}(this, function (Marionette,_) {
  "use strict";

  var ProgressView = Marionette.ItemView.extend({

    currentIndex : 0,

    views : [],

    //When Using a template
    //You can attach the Views To A Specific Selector
    viewContainer : null,

    constructor : function(){
      Marionette.View.prototype.constructor.apply(this, arguments);
      if (!this.views) throw new Error("Views Must Be Provided");
      if (this.options.onComplete) this.onComplete = this.options.onComplete;
      if (this.options.viewContainer) this.viewContainer = this.options.viewContainer;
      this.on('show render', this.showView);
    },

    showView : function() {
      if (!this.currentView) {
        var View = this.views[this.currentIndex];
        this.currentView = new View();
      }

      this.currentView.render();

      this.eventBinder.bindTo(this.currentView, 'prev:item', this.loadPreviousView, this);
      this.eventBinder.bindTo(this.currentView, 'next:item', this.loadNextView, this);
      this.eventBinder.bindTo(this.currentView, 'close:progress', this.close, this);

      if (this.viewContainer) {
        this.$(this.viewContainer).append(this.currentView.$el);
      } else {
        this.$el.append(this.currentView.$el);
      }
    },

    getCompletion : function() {
      return (this.currentIndex / this.views.length) * 100;
    },

    //@todo Re-address
    loadPreviousView : function() {
      this.currentIndex--;
      this.loadView();
    },

    //@todo Re-address
    loadNextView : function() {
      this.currentIndex++;
      this.loadView();
    },

    loadView : function (){
      var totalViews = this.views.length;
      if (_.isFunction(this.onProgress)) this.onProgress(this.getCompletion());

      //Cleanup Previous View
      this.currentView.close();
      this.currentView = null;

      if (totalViews > this.currentIndex) {
        //Load the next view
        this.showView();
      } else {
        //Call Completion Handler
        if (_.isFunction(this.onComplete)) this.onComplete();
      }
    }
  });

  return ProgressView;
}));
