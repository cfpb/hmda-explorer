# CFPB's Public Data Platform

An interactive front-end for [Qu](https://github.com/cfpb/qu).

## Documentation

See some [front-end notes](https://fake.ghe.domain/data-platform/data-platform-docs/wiki/Front-End-Framework-Notes) or the [documented source](https://fake.ghe.domain/pages/data-platform/public-data-platform/docs/main.html).

## Contributing

1. [Install Node and Grunt](https://fake.ghe.domain/contolini/grunt-init-cfpb#prerequisites)
1. `git clone git@fake.ghe.domain:data-platform/public-data-platform.git`
1. `cd public-data-platform`
1. `npm install`
1. `bower install`
1. `grunt`
1. Open `localhost:8000` in a browser.

Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. [grunt-cfpb-internal](https://fake.ghe.domain/contolini/grunt-cfpb-internal) generates this README. Bump versions in CHANGELOG when appropriate.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

 * 2013-07-12   v0.3.0   Modularize all JavaScript. Add hash deparam feature. Ability to set DOM fields from params hash.
 * 2013-07-10   v0.2.0   Asynchronously populate field options. Field dependency management.
 * 2013-07-09   v0.1.6   Initial URL building methods. General refactoring.
 * 2013-07-08   v0.1.3   Add global observer.
 * 2013-07-06   v0.1.1   Configure build process.
 * 2013-07-05   v0.1.0   Initial commit of static version (forked from `backbone` branch).

## License

Software source code written entirely by Consumer Financial Protection Bureau staff, and by contractors who are developing software on behalf of CFPB, is by default a public domain work.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/

---

*This file was generated on Sat Jul 13 2013 03:09:30.*
