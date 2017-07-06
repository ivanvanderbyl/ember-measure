# ember-measure [![Build Status](https://travis-ci.org/ivanvanderbyl/ember-measure.svg?branch=master)](https://travis-ci.org/ivanvanderbyl/ember-measure) [![Ember Observer Score](https://emberobserver.com/badges/ember-measure.svg)](https://emberobserver.com/addons/ember-measure) [![npm version](https://badge.fury.io/js/ember-measure.svg)](https://badge.fury.io/js/ember-measure) [![Dependency Status](https://david-dm.org/ivanvanderbyl/ember-measure.svg)](https://david-dm.org/ivanvanderbyl/ember-measure) [![devDependency Status](https://david-dm.org/ivanvanderbyl/ember-measure/dev-status.svg)](https://david-dm.org/ivanvanderbyl/ember-measure.svg#info=devDependencies)

Provides an easy to use mixin for measuring DOM elements within Ember Components,
and responding to size changes. Internally we use a [`ResizeObserver`](https://developers.google.com/web/updates/2016/10/resizeobserver), which is a new
type of `MutationObserver`, as such there is an included polyfill to support older browsers back
to IE10.

> ### Motivation
> previously, you had to attach a listener to the document’s resize event to get notified of any change of the viewport’s dimensions. In the event handler, you would then have to figure out which elements have been affected by that change and call a specific routine to react appropriately. If you need the new dimensions of an element after a resize, you need to call getBoundingClientRect or getComputerStyle, which can cause layout thrashing if you don’t take care of batching all your reads and all your writes.
> 
> And then you realize that this doesn’t even cover the cases where elements change their size without the main window having been resized. For example, appending new children, setting an element’s display style to none, or similar actions can change the size of an element, its siblings or ancestors.
> 
> This is why ResizeObserver is a useful primitive. It reacts to changes in size of any of the observed elements, independent of what caused the change. It provides you access to the new size of the observed elements, too. Let’s get straight into it.

This addon is semantically similar to [souporserious/react-measure](https://github.com/souporserious/react-measure) and borrows some implementation ideas from there.

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
{{#dom-measure as |rect|}}
  <p>I am {{rect.client.height}}px tall!</p>
{{/dom-measure}}
```

### 2. Within a component:

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

**`contentRect.client`:**

Contains the measurements of this component.

**`contentRect.offset`:**

Contains the offset position of this component from the document.

**`contentRect.scroll`:**

Contains the scroll offset information.

**`contentRect.bounds`:**

Uses [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) 
to calculate bounds of the component element. You can disable this property
by supplying a custom list of `rectTypes`.

**`contentRect.margin`:**

Uses [`getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) 
to calculate margins of the component element. You can disable this property (to avoid layout thrashing)
by supplying a custom list of `rectTypes`.

**`contentRect.entry`**

Contains the `ResizeObserverEntry` for the current resize event, which can be further
queried for more size information.

### `rectTypes`

You can control which properties are measured when a resize occurs by supplying
your own list of `rectTypes` within the Component. 

Defaults to `['client', 'offset', 'scroll', 'bounds', 'margin']`.

---

**Take a look at the dummy app for a working example.**

## Caviates

The Polyfill used by this library doesn't observe SVG changes correctly. To work
around this, put the SVG you want to measure inside a DIV and measure the div, then
use the observerd measurements to fill the SVG width and height to match the DIV.

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
