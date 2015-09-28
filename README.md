# Remap.js

Remap.js allows you to replace the actual dependencies of a module with your chosen ones. It's a simple but powerful tool to inject mocks for your test suites.

## Installing Remap.js

Simply install via bower:

```
$ bower install remapjs
```

And include it after including `require.js`:

```html
<script data-main="scripts/main" src="path/to/require.js"></script>
<script src="path/to/remap.js"></script>
```

## Using Remap.js

When adding remap.js after require.js you get a new method, `require.contextualized(dependencyMap)` that creates a new version of the `require` function allowing you to load modules in a regular way but forcing dependencies to follow the `dependencyMap` you passed as parameter. This is specially useful for unit testing:

```js
var testingSubject;

var req = require.contextualized({
  'ChatServer': ServerMock,
  'ChatClient': ClientMock
});

// When trying to load dependecies for ChatWidget, requiring 'ServerMock' will
// return MockServer and requiring 'ClientMock' will return MockClient.
req('ChatWidget', function (ChatWidget) {
  testingSubject = ChatWidget;
});
```

## Use with Chai.js

Actually, I did not use require.js for bundling my projects but I find it very convenient for unit testing. This is a setup I usually work with combined with [Chai](http://chaijs.com/).

Suppose you have this definition of `ChatWidget`:

```js
// src/ChatWidget.js

define([
  'ChatServer',
  'ChatClient'
], function (ChatUI, ChatClient) {

  /** My chat widget implementation...*/

  return ChatWidget;
});
```

And you want `ChatWidget` to use mocked object instead of the actual modules, so in your spec file you do:

```js
// ChatWidget.spec.js

define([
  'mocks/ServerMock',
  'mocks/ClientMock'
], function (ServerMock, ClientMock) {

  describe(function () {
  
    var ChatWidget;
    
    var req = require.contextualized({
      'ChatServer': ServerMock,
      'ChatClient': ClientMock
    });
  
    beforeEach(function (done) {
      req('src/ChatWidget', function (subject) {
        ChatWidget = subject;
        done();
      });
    });

    // Your tests here...
  
  });

});
```

Notice you don't load your test subject (`ChatWidget`) at the beginning of the spec but in the `beforeEach()` hook, this allow to isolate the module and provide mocks in different ways according to the specific functionality you're testing.

## Thanks

The implementation was inspired by [Mock/stub your requirejs dependecies](https://coderwall.com/p/teiyew/mock-stub-your-requirejs-dependecies).
