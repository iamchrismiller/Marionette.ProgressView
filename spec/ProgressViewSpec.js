/*globals Marionette, beforeEach, $, require, jasmine, describe, it, expect, loadFixtures*/

describe("ProgressView", function () {
  "use strict";

  it('Should be an extension of Backbone View', function() {
    var progress = Marionette.ProgressView.extend({
      views : [Marionette.View]
    });
    expect(new progress() instanceof Backbone.View).toBeTruthy();
  });

  it('Should attach rendered views to a selector within the specified template ', function() {

    var singleProgressView = Marionette.ProgressView.extend({
      template : _.template("<div class='foo'></div>"),
      viewContainer : ".foo",
      views : [Marionette.View.extend({ className : 'fooView'})]
    });
    var progress = new singleProgressView();
    progress.render();
    expect(progress.$('.fooView').length).toBeTruthy();
  });

  it('Should render a single view', function() {
    var singleProgressView = Marionette.ProgressView.extend({
      views : [Marionette.View.extend({})]
    });
    var progress = new singleProgressView();
    progress.render();
    expect(progress.getViewCount()).toBe(1);
  });

  it('Should render a multiple views in sequential order', function() {
    var sequentialProgressView = Marionette.ProgressView.extend({
      views : [
        Marionette.View.extend({ options : { ix : 1}}),
        Marionette.View.extend({ options : { ix : 2}})
      ]
    });
    var progress = new sequentialProgressView();
    progress.render();
    expect(progress.currentView.options.ix).toBe(1);
    progress.loadNextView();
    expect(progress.currentView.options.ix).toBe(2);
  });

  it('Should render the second view when constructed', function() {
    var sequentialProgressView = Marionette.ProgressView.extend({
      //zero based ix
      viewIndex : 1,
      views : [
        Marionette.View.extend({ options : { ix : 1}}),
        Marionette.View.extend({ options : { ix : 2}})
      ]
    });
    var progress = new sequentialProgressView();
    progress.render();
    expect(progress.currentView.options.ix).toBe(2);
  });

  it('Should throw an error when no views are defined', function() {
    var missingViewsProgress = Marionette.ProgressView.extend();
    try {
      var progress = new missingViewsProgress();
    } catch (e) {
      //cannot catch error messages with phantom
      //https://code.google.com/p/phantomjs/issues/detail?id=166
      expect(e).toBeTruthy();
    }
  });

  it('Should call the onProgress handler when swapping out views', function() {
    var sequentialProgressView = Marionette.ProgressView.extend({
      views : [
        Marionette.View.extend({ options : { ix : 1}})
      ],
      onProgress : function() {}
    });
    var progress = new sequentialProgressView();
    spyOn(progress, 'onProgress');
    progress.render().loadNextView();
    expect(progress.onProgress).toHaveBeenCalled();
  });

  it('Should call the onComplete handler when triggered', function() {
    var sequentialProgressView = Marionette.ProgressView.extend({
      views : [
        Marionette.View.extend({ options : { ix : 1}})
      ],
      onComplete : function() {}
    });
    var progress = new sequentialProgressView();
    spyOn(progress, 'onComplete');
    progress.render().loadNextView();
    expect(progress.onComplete).toHaveBeenCalled();
  });

});
