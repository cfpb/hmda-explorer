# Home Mortgage Disclosure Act [![Build Status](https://travis-ci.org/cfpb/hmda-explorer.svg?branch=master)](https://travis-ci.org/cfpb/hmda-explorer)

A single-page application for exploring HMDA data served from [Qu](https://github.com/cfpb/qu). This code is live at [http://consumerfinance.gov/hmda](http://consumerfinance.gov/hmda).

![Home Mortgage Disclosure Act](https://github.com/cfpb/hmda-explorer/raw/master/docs/screenshot.png)

## Documentation

View the [documented source code](http://cfpb.github.io/hmda-explorer/docs/main.html) (use the top right menu).

## Deployment

Follow the steps below to get your environment set up. `grunt build` will create a `dist` directory. Copy the contents of `dist` to wherever you want the app to live.

By default, this app will serve data from [api.consumerfinance.gov](http://api.consumerfinance.gov/data/hmda/). If you'd like to use a different endpoint, build the app with an [`endpoint` flag](https://github.com/cfpb/hmda-explorer/blob/master/Gruntfile.js#L15-L21): `grunt build --endpoint=http://someotherurl.com/api/whatever/`.

## Contributing

Please use the [fork and pull](https://help.github.com/articles/using-pull-requests#fork--pull) collaborative model.

1. Install [Node](http://nodejs.org/) and [Grunt](http://gruntjs.com/).
1. [Fork this repo](https://github.com/cfpb/hmda-explorer/fork) to your personal GH account.
1. `git clone git@github.com:YOUR-USERNAME/hmda-explorer.git`
1. `cd hmda-explorer`
1. `npm install`
1. `bower install`
1. `grunt build`
1. `grunt`
1. Open `localhost:8000` in a browser.

Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. [grunt-cfpb-internal](https://github.com/cfpb/grunt-cfpb-internal) generates this README.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History
 * 2014-09-22...[v1.1.0]()...Updated with 2013 Data and Static S3 File Routing
 * 2014-08-05...[v1.0.1](https://github.com/cfpb/hmda-explorer/releases/tag/v1.0.1)...Location filters and display bug fixes
 * 2014-06-13   [v1.0.0](../../tree/v1.0.0)   Add `endpoint` build flag for internal testing. Update Learn More content.
 * 2014-04-20   [v0.19.3](../../tree/v0.19.3)   Prep code for open source release.
 * 2014-02-20   [v0.19.2](../../tree/v0.19.2)   Add `bind()` polyfill to homepage to aid automated testing.
 * 2014-02-10   [v0.19.1](../../tree/v0.19.1)   Remove census tract from summary tables.
 * 2014-02-06   [v0.19.0](../../tree/v0.19.0)   Improve usability of file size estimation (#466).
 * 2014-01-07   [v0.18.7](../../tree/v0.18.7)   Update GA nomenclature.
 * 2014-01-07   [v0.18.6](../../tree/v0.18.6)   Roll back icon font.
 * 2014-01-06   [v0.18.5](../../tree/v0.18.5)   Improve URL param sanitization.
 * 2013-12-31   [v0.18.4](../../tree/v0.18.4)   Include year in reset filters (#458).
 * 2013-12-16   [v0.18.3](../../tree/v0.18.3)   Remove lender name text (#452). Make 'calculate by' dropdown more verbose (#423). Improve file size estimation accuracy (#379).
 * 2013-12-10   [v0.18.2](../../tree/v0.18.2)   Add the reset button back.
 * 2013-11-27   [v0.18.1](../../tree/v0.18.1)   Improve charts' UX (#333).
 * 2013-11-25   [v0.18.0](../../tree/v0.18.0)   Add suggested filters (#438).
 * 2013-10-24   [v0.17.2](../../tree/v0.17.2)   Properly coerce loan amounts (#408). Correctly fire download tooltips (#415).
 * 2013-10-20   [v0.17.1](../../tree/v0.17.1)   Improved caching (#373), error handling and file size estimation. Disable download button if record count is zero (#380).
 * 2013-10-10   [v0.16.2](../../tree/v0.16.2)   Include rate spread in loan description section (#38).
 * 2013-10-07   [v0.16.1](../../tree/v0.16.1)   Purge `dist` directories. Update readme accordingly.
 * 2013-10-06   [v0.16.0](../../tree/v0.16.0)   Break pages into HTML partials and Markdown files. Remove build artifacts from repo.
 * 2013-09-20   [v0.15.2](../../tree/v0.15.2)   Swap chart columns. Hack map `ready` event listener for IE8.
 * 2013-09-18   [v0.15.1](../../tree/v0.15.1)   Fix MSAs in charts. Refactor summary table page to work with API changes.
 * 2013-09-17   [v0.15.0](../../tree/v0.15.0)   Bajillion tweaks in preparation for Plan B release.
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
 * 2013-07-31   [v0.7.4](../../tree/v0.7.4)   Add Co-Applicant toggle. Add CFPB logo.
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

The project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](http://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/


---

*This file was generated on Fri Jun 13 2014 14:39:38.*
