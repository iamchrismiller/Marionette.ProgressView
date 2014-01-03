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

    template : _.template("<div class='content'></div>"),

    viewIndex : 0,

    views : [],

    //When Using a template
    //attach the Views To A Specific Selector
    viewContainer : '.content',

    constructor : function(){
      Marionette.View.prototype.constructor.apply(this, arguments);

      if (!this.views || _.isEmpty(this.views)) {
        throw new Error("Views Must Be Provided");
      }

      if (this.options.viewContainer) {
        this.viewContainer = this.options.viewContainer;
      }

      this.on('render', this.showView);
    },

    showView : function() {
      if (!this.currentView) {
        this.currentView = new this.views[this.viewIndex]();
      }
      this.currentView.render();
      this._initListeners();
      this._appendView();
    },

    getViewCount : function() {
      return this.views.length;
    },

    getCurrentIndex : function() {
      return this.viewIndex;
    },

    getCurrentCompletion : function() {
      return (this.viewIndex / this.views.length) * 100;
    },

    loadPreviousView : function() {
      this.viewIndex--;
      this._loadView();
    },

    loadNextView : function() {
      this.viewIndex++;
      this._loadView();
    },

    _loadView : function (){
      this._handleProgress();
      this._cleanupCurrentView();
      if (this.getViewCount() > this.viewIndex) {
        this.showView();
      } else {
        this._handleComplete();
      }
    },

    _appendView : function() {
      if (this.viewContainer) {
        this.$(this.viewContainer).append(this.currentView.$el);
      } else {
        this.$el.append(this.currentView.$el);
      }
    },

    _cleanupCurrentView : function() {
      this.currentView.close();
      this.currentView = null;
    },

    _initListeners : function() {
      this.listenTo(this.currentView, 'prev:item', this.loadPreviousView, this);
      this.listenTo(this.currentView, 'next:item', this.loadNextView, this);
      this.listenTo(this.currentView, 'close:progress', this.close, this);
    },

    _handleProgress : function() {
      if (_.isFunction(this.onProgress)) {
        this.onProgress(this.getCurrentCompletion(), this.getCurrentIndex());
      }
    },

    _handleComplete: function() {
      if (_.isFunction(this.onComplete)) this.onComplete();
    }
  });

  return ProgressView;
}));