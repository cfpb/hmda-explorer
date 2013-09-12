# CFPB's Public Data Platform

An interactive front-end for HMDA data served from [Qu](https://github.com/cfpb/qu). View the [nightly](https://fake.ghe.domain/pages/data-platform/public-data-platform/) demo.

## Documentation

See some [front-end notes](https://fake.ghe.domain/data-platform/data-platform-docs/wiki/Front-End-Framework-Notes) or the [documented source](https://fake.ghe.domain/pages/data-platform/public-data-platform/docs/main.html) (use the top right menu).

## Deployment

Copy the contents of `dist` to wherever you want the app to live. For github pages, here's a [git hook](https://fake.ghe.domain/gist/389) that will automatically copy the stuff in `dist` over to your gh-pages branch whenever you commit.

## Contributing

Please use the [fork and pull](https://help.github.com/articles/using-pull-requests#fork--pull) collaborative model.

1. [Install Node and Grunt](https://fake.ghe.domain/contolini/grunt-init-cfpb#prerequisites) (Just do the prerequisites section on that page, ignore all the other stuff.)
1. Install Bower v0.10.0: `npm install -g bower@0.10.0` *Avoid newer versions due to a [node-tar bug](https://github.com/bower/bower/issues/727#issuecomment-22309010).*
1. [Fork this repo](https://fake.ghe.domain/data-platform/public-data-platform/fork) to your personal GH account.
1. `git clone git@fake.ghe.domain:YOUR-USERNAME/public-data-platform.git`
1. `cd public-data-platform`
1. `npm install`
1. `bower install`
1. `grunt`
1. Open `localhost:8000` in a browser.

[Comprehensive setup notes](https://fake.ghe.domain/gist/382) from @danmurphy are also available.

Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. [grunt-cfpb-internal](https://fake.ghe.domain/contolini/grunt-cfpb-internal) generates this README.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

 * 2013-09-08   [v0.14.1](../../tree/v0.14.1)   Improve mobile experience. Add layers to homepage map.
 * 2013-09-07   [v0.14.0](../../tree/v0.14.0)   Restructuring for Plan B. Whole lotta improvements to the static pages.
 * 2013-09-03   [v0.13.0](../../tree/v0.13.0)   New summary table button. Permalinkin' the summary table.
 * 2013-09-01   [v0.12.1](../../tree/v0.12.1)   Update icons and links. Add coverage capabilities and data-driven testing.
 * 2013-08-28   [v0.12.0](../../tree/v0.12.0)   New lender section. New census tract functionality. Bug fixes galore.
 * 2013-08-27   [v0.11.2](../../tree/v0.11.2)   Debounce explore page interactions (#90).
 * 2013-08-26   [v0.11.1](../../tree/v0.11.1)   Improve tests and documentation. Add charts to homepage.
 * 2013-08-13   [v0.11.0](../../tree/v0.11.0)   Give up on an AJAX request after X seconds have passed. Ability to download summary tables.
 * 2013-08-10   [v0.10.3](../../tree/v0.10.3)   Loading visualizations for dependent fields. Homepage clean up.
 * 2013-08-08   [v0.10.2](../../tree/v0.10.2)   Itty-bitty hashchange router implemented.
 * 2013-08-07   [v0.10.1](../../tree/v0.10.1)   Summary table improvements galore.
 * 2013-08-06   [v0.10.0](../../tree/v0.10.0)   Summary tables brought into the explore page.
 * 2013-08-05   [v0.9.2](../../tree/v0.9.2)   Add state/msa mutual exclusiveness.
 * 2013-08-04   [v0.9.1](../../tree/v0.9.1)   Improve serialization of location params.
 * 2013-08-02   [v0.9.0](../../tree/v0.9.0)   New location section functionality. Moved templates into JST using grunt-contrib-jst task.
 * 2013-08-01   [v0.8.1](../../tree/v0.8.1)   Fix preview table bug that returned wrong number of columns.
 * 2013-07-31   [v0.8.0](../../tree/v0.8.0)   Initial NLW implementation.
 * 2013-07-31   [v0.7.6](../../tree/v0.7.6)   Add Co-Applicant toggle. Add CFPB logo.
 * 2013-07-30   [v0.7.5](../../tree/v0.7.5)   Improve test coverage of new API.
 * 2013-07-30   [v0.7.4](../../tree/v0.7.4)   Refactor API URL building method to better accommodate summary table $select/$group clauses.
 * 2013-07-30   [v0.7.3](../../tree/v0.7.3)   Use ZeroClipboard to save share URL to clipboard.
 * 2013-07-29   [v0.7.2](../../tree/v0.7.2)   Memoize AJAX requests. Add section toggle to explore page header.
 * 2013-07-24   [v0.7.1](../../tree/v0.7.1)   Section parameter is properly stored in sharing URL hash.
 * 2013-07-23   [v0.7.0](../../tree/v0.7.0)   Popular filters section w/ synchronizing toggle.
 * 2013-07-22   [v0.6.0](../../tree/v0.6.0)   Initial preview table implementation. Initial summary table implementation.
 * 2013-07-19   [v0.5.2](../../tree/v0.5.2)   Icons and sugar.
 * 2013-07-18   [v0.5.1](../../tree/v0.5.1)   Connect dependent dropdowns to concept data endpoints.
 * 2013-07-17   [v0.5.0](../../tree/v0.5.0)   Beef up testing suite. Fix text input caching bug. Change location of HTML files.
 * 2013-07-16   [v0.4.1](../../tree/v0.4.1)   Dependent fields are properly enabled/disabled.
 * 2013-07-15   [v0.4.0](../../tree/v0.4.0)   Help tooltips. Form styling. Chosen JS implementation.
 * 2013-07-12   [v0.3.0](../../tree/v0.3.0)   Modularize all JavaScript. Add hash deparam feature. Ability to set DOM fields from params hash.
 * 2013-07-10   [v0.2.0](../../tree/v0.2.0)   Asynchronously populate field options. Field dependency management.
 * 2013-07-09   [v0.1.6](../../tree/v0.1.6)   Initial URL building methods. General refactoring.
 * 2013-07-08   [v0.1.3](../../tree/v0.1.3)   Add global observer.
 * 2013-07-06   [v0.1.1](../../tree/v0.1.1)   Configure build process.
 * 2013-07-05   [v0.1.0](../../tree/v0.1.0)   Initial commit of static version (forked from `backbone` branch).

## License

Software source code written entirely by Consumer Financial Protection Bureau staff, and by contractors who are developing software on behalf of CFPB, is by default a public domain work.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/

---

*This file was generated on Mon Sep 09 2013 17:52:30.*
