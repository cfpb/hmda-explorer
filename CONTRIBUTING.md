## Running the site locally

Please use the [fork and pull](https://help.github.com/articles/using-pull-requests#fork--pull) collaborative model.

1. Install [Node](http://nodejs.org/) and [Grunt](http://gruntjs.com/).
1. [Fork this repo](https://github.com/cfpb/hmda-explorer/fork) to your personal GH account.
1. [Fork the hmda-tech](https://github.com/cfpb/hmda-tech/fork) repo to your personal GH account.
1. `git clone git@github.com:YOUR-USERNAME/hmda-explorer.git`
1. `cd hmda-explorer`
1. `npm install`
1. `bower install`
1. `cd src/static`
1. `mkdir json`
1. `cd json`
1. `git clone git@github.com:YOUR-USERNAME/hmda-tech.git`
1. `cd ../../../`
1. `grunt build`
1. `grunt`
1. Open `localhost:8000` in a browser.

Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. Refresh `localhost:8000` to see your changes.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Tagging releases

1. Add a new version to the top of `CHANGELOG` with today's date and a list of changes. Use [semver](http://semver.org/).
1. Run `grunt docs`. This will generate some docs and run [grunt-cfpb-internal](https://github.com/cfpb/grunt-cfpb-internal).
1. Push the tag to GitHub with `git push upstream --tags`.
