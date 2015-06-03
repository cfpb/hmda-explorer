## Running the site locally

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

Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. Refresh `localhost:8000` to see your changes.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Tagging releases for deployment.

To deploy code to production, you need to tag it and push the tag up to GitHub. The easiest way to do this is with [grunt-cfpb-internal](https://github.com/cfpb/grunt-cfpb-internal). Here's the process:

1. Make sure the code is good-to-go. Tags can't be edited.
1. Add a new version to the top of `CHANGELOG` with today's date and a list of changes. Use the [semver](http://semver.org/) convention. Save and close `CHANGELOG`.
1. Run `grunt docs`.
1. Everything is now tagged and ready for production.

`grunt docs` generates new Docco docs from the source code and kicks off [grunt-cfpb-internal](https://github.com/cfpb/grunt-cfpb-internal) which:

1. Appends the latest changes to the end of the `README`.
1. Timestamps the `README`.
1. Bumps the version number in package.json and bower.json.
1. Creates an annotated git tag.
