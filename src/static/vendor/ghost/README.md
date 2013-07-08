# [Ghost](https://fake.ghe.domain/pages/contolini/ghost/grid/index.html)

A LESS-based CSS3 grid system using parametric mixins to encourage semantic HTML. Ghost has three main features:

1. Provides fixed-width gutters with fluid-width columns without resorting to padding hacks.
1. Works seamlessly with any combination of grid and gutter widths.
1. Keeps HTML semantic by not including presentational classes in markup.

## Fixed gutters, fluid columns

Ghost uses CSS3's <a href="http://updates.html5rocks.com/2012/03/CSS-layout-gets-smarter-with-calc">calc() property</a> to provide fixed-width gutters. Older browsers fallback to fluid gutters. The gutter widths and grid width are set using the `@gutter-width` and `@wrapper-width` variables, respectively.

## Semantic HTML

Instead of:

```
<header class="row">
    <aside class="span4">
        Lorem ipsum Ut deserunt do nostrud. 
    </aside>
    <section class="span8">
        Lorem ipsum Voluptate pariatur Duis fugiat cupidatat quis pariatur.
    </section>
</header>
```

Ghost allows you to write:

```
<header>
    <aside class="welcome-message">
        Lorem ipsum Ut deserunt do nostrud. 
    </aside>
    <section class="customer-info">
        Lorem ipsum Voluptate pariatur Duis fugiat cupidatat quis pariatur.
    </section>
</header>
```

Using LESS that looks like this:

```
header {
  .row();
}

.welcome-message {
  .column(4);
}

.customer-info {
  .column(8);
}
```

## Getting Started

Grab `ghost.less` from the `dist` directory and @import it at the top of your application's LESS stylesheet.

## Documentation
_(Coming soon)_

## Examples

There is a [test runner](https://fake.ghe.domain/pages/contolini/ghost/grid/index.html) and an example of [Bootstrap integration](https://fake.ghe.domain/pages/contolini/ghost/bootstrap/index.html). These examples can be found in the archive at `dist/example.zip`. They use less.js to compile their LESS. You'll need to run a server locally to avoid cross-origin complaints. Try `python -m SimpleHTTPServer` in the example's directory.

Ghost is used by [Qui](https://fake.ghe.domain/pages/contolini/qui) (<a href="https://fake.ghe.domain/contolini/qui/blob/master/src/less/main.less">stylesheet</a>).

## Contributing

Edit the files in `src` and run `grunt build` whenever you're ready to compile LESS and automagically copy appropriate source files into the `dist` dir, archiving the examples in a .zip. Running `grunt` with no options will start a server on port 8000 (for testing the [examples](https://fake.ghe.domain/contolini/ghost/tree/master/src/examples) locally) and automatically `build` whenever a source file is changed.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

 * 2013-07-01   v0.4.0   Add grunt-cfpb-internal to manage versioning.

## License

Software source code written entirely by Consumer Financial Protection Bureau staff, and by contractors who are developing software on behalf of CFPB, is by default a public domain work.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/

---

*This file was generated on Mon Jul 01 2013 23:53:20.*
