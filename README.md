# ember-measure

Provides an easy to use mixin for measuring DOM elements within Ember Components,
and responding to size changes. Internally we use a [`ResizeObserver`](https://developers.google.com/web/updates/2016/10/resizeobserver), which is a new
type of `MutationObserver`, as such there is an included polyfill to support older browsers back
to IE10.

## Installation

```sh
ember install ember-measure
```

**Requirements:**

- Node 6+
- Ember 2.10+
- Ember CLI 2.10+

## Usage

You can use this addon in two ways:

### 1. As a component:

```hbs
{{dom-measure as |rect|}}
  <p>I am {{rect.client.height}}px tall!</p>
{{/dom-measure}}
```

### 2. Within your component:

```js
import Component from 'ember-component';
import WithContentRect from 'ember-measure/with-content-rect';

export default Component.extend(WithContentRect, {
  didResize(contentRect) {
    // contentRect contains DOMContentRects for each of client, 
    // offset, scroll, bounds, margin.
  }
});
```

There's also a `contentRect` property which is updated whenever a change is made.

You could, for example, use this to fetch the `width` and `height` of the element:

```js
import Component from 'ember-component';
import computed from 'ember-computed';
import WithContentRect from 'ember-measure/with-content-rect';

export default Component.extend(WithContentRect, {
  width: computed.reads('contentRect.client.width'),
  height: computed.reads('contentRect.client.height'),
});
```

### `contentRect`

The `contentRect` has the following properties:

#### `contentRect.client`:

Contains the measurements of this component.

#### `contentRect.offset`:

Contains the offset position of this component from the document.

#### `contentRect.scroll`:

Contains the scroll offset information.

#### `contentRect.bounds`:

Contains the bounding box information of the element.

#### `contentRect.margin`:

Contains the CSS margin information of the element.

#### `contentRect.entry`

Contains the `ResizeObserverEntry` for the current resize event, which can be further
queried for more size information.

---

**Take a look at the dummy app for a working example.**

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
