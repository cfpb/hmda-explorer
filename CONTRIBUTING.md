1. [Install Node and Grunt](https://fake.ghe.domain/contolini/grunt-init-cfpb#prerequisites)
1. Install Bower v0.10.0: `npm install -g bower@0.10.0` *Avoid newer versions due to a [node-tar bug](https://github.com/bower/bower/issues/727#issuecomment-22309010).*
1. `git clone git@fake.ghe.domain:data-platform/public-data-platform.git`
1. `cd public-data-platform`
1. `npm install`
1. `bower install`
1. `grunt`
1. Open `localhost:8000` in a browser.

Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. [grunt-cfpb-internal](https://fake.ghe.domain/contolini/grunt-cfpb-internal) generates this README. Bump versions in CHANGELOG when appropriate.

In lieu of a formal styleguide, take care to maintain the existing coding style.
