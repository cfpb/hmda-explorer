:warning: This project is archived and no longer maintained :warning:

---
---
---

# Home Mortgage Disclosure Act

A single-page application for exploring HMDA data served from [Qu](https://github.com/cfpb/qu). This code is live at [http://consumerfinance.gov/hmda](http://consumerfinance.gov/hmda).

![Home Mortgage Disclosure Act](https://github.com/cfpb/hmda-explorer/raw/master/docs/screenshot.png)

## Documentation

View the [documented source code](http://cfpb.github.io/hmda-explorer/docs/main.html) (use the top right menu).

## Deployment

Follow the steps below to get your environment set up. `grunt build` will create a `dist` directory. Copy the contents of `dist` to wherever you want the app to live.

By default, this app will serve data from [api.consumerfinance.gov](http://api.consumerfinance.gov/data/hmda/). If you'd like to use a different endpoint, build the app with an [`endpoint` flag](https://github.com/cfpb/hmda-explorer/blob/master/Gruntfile.js#L15-L21): `grunt build --endpoint=https://someotherurl.com/api/whatever/`.

## Contributing

## Running the site locally

Please use the [fork and pull](https://help.github.com/articles/using-pull-requests#fork--pull) collaborative model.

1. Install [Node](http://nodejs.org/) and [Grunt](http://gruntjs.com/)
1. [Fork this repo](https://github.com/cfpb/hmda-explorer/fork) to your personal GH account.
1. `git clone git@github.com:YOUR-USERNAME/hmda-explorer.git`
1. `cd hmda-explorer`
1. `npm install`
1. `bower install`
1. `grunt build`
1. `grunt`
1. Open `localhost:8000` in a browser.

Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. Refresh `localhost:8000` to see your changes.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Tagging releases

1. Add a new version to the top of `CHANGELOG` with today's date and a list of changes. Use [semver](http://semver.org/).
1. Run `grunt docs`. This will generate some docs and run [grunt-cfpb-internal](https://github.com/cfpb/grunt-cfpb-internal).
1. Push the tag to GitHub with `git push upstream --tags`.

## License

The project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](http://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/
