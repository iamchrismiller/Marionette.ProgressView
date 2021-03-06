# Marionette.ProgressView [![Build Status](https://api.travis-ci.org/iamchrismiller/Marionette.ProgressView.png?branch=master)](https://api.travis-ci.org/iamchrismiller/Marionette.ProgressView.png?branch=master) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/iamchrismiller/marionette.progressview/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

A Flexible and customizable Backbone.Marionette Progress Series View.

What does that mean?

  - Easily Extensible to do what you need when loading views in order
  - onUpdate / onComplete methods for view events
  - Current Completion Percentage method
  - Custom Container Template
  - Start with any view index
  - Trigger Next / Previous load within the loaded view
  - Call loadNextView / loadPreviousView directly

## Getting Started

  I have included a simple ProgressView example with a bootstrap progressbar in the example directory.

  - Clone the Repo and cd into directory
  - Install Dev Dependencies (npm install)
  - Start the dev server (grunt dev)
  - Choose the examples directory within the browser
  - Enjoy the example

## Usage

### Options :

   - `template` -> (string/function) Use a custom container template
   - `viewContainer` -> (string) Where to place the views on render
   - `viewIndex` -> (int) Which view to start with
   - `views` -> (array) Views to load in array order

  ```
    var sequentialProgressView = Marionette.ProgressView.extend({
        template : _.template("<div class='custom'></div>"),
        viewContainer : '.custom',
        views : [
          Marionette.View.extend({}),
          Marionette.View.extend({})
        ]
      });
  ```

### Dependencies

- Marionette - v1.0.0

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using grunt.

## Release History

- 0.1.0 Initial release
- 0.2.0 Updated Backbone listenTo/BindTo handlers, expose getViewCount, added default template
- 0.2.1 Added Current Index to onUpdate method
- 0.2.2 Added onBeforeClose method to call onComplete method
- 0.2.3 Removed Unnecessary onBeforeClose call

## License

Licensed under the Apache 2.0 license.

## Author

Chris Miller
