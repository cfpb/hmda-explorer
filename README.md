# CFPB's Public Data Platform

An interactive front-end for HMDA data served from [Qu](https://github.com/cfpb/qu). View the [stable](https://fake.ghe.domain/pages/data-platform/public-data-platform/) or [nightly](https://fake.ghe.domain/pages/contolini/public-data-platform) demo.

## Documentation

See some [front-end notes](https://fake.ghe.domain/data-platform/data-platform-docs/wiki/Front-End-Framework-Notes) or the [documented source](https://fake.ghe.domain/pages/data-platform/public-data-platform/docs/main.html) (use the top right menu).

## Contributing


## Requirements

### xCode

Use self-service to update xCode to the latest version

### 1. Homebrew:

https://fake.ghe.domain/pages/cfpb/handbook/your-laptop.html

If homebrew is already installed, update homebrew to the latest version:

```
$ brew update
```

#### 2. Brew Applications Node.js and Phantom.js
```
$ brew install node

- or - 

$ brew upgrade node

$ brew install phantomjs
```

#### 3. Configure Node Package Manager:

Add the path to the Node package manager to your ~/.bashprofile, here is an example path variable that prepends the homebrew bin locations to your path:

```
export PATH=$HOME/homebrew/bin:$HOME/homebrew/sbin:$HOME/homebrew/share/npm/bin:$HOME/homebrew/share/python:$HOME/homebrew/opt/ruby/bin:$PATH
```

#### 4. Install the Node applications: Bower and Grunt

Bower is a JavaScript library manager. Grunt is a task runner.

```
$ npm install -g bower

$ npm install -g grunt
```

#### 5. Clone the project from git

```
$ cd ~/git

$ git clone git@fake.ghe.domain:danmurphy/public-data-charts.git
```

CD to the project you plan to work on
```
$ cd ~\git\public-data-charts
```

#### 6. Install bower packages

Bower is used to install the JavaScript libraries used by the public data platform. Even though these libraries are stored inside the project, they are ignored from git.

```
$ bower install
$ bower install git@fake.ghe.domain:front/ghost.git
$ bower install git@fake.ghe.domain:adamscott/cfpb-icon-font.git
```

Bower uses .bowerrc and bower.json for configuration

Bower downloads its packages into ~/git/public-data-charts/src/static/vendor/. This folder is ignored by git, according to the .gitignore file. This will download the files in bower.json, e.g. jQuery, Highcharts, etc.

rename:

src/static/vendor/cfpb-icon-font

to:

src/static/vendor/cfpb-font-icons

See issue 93 for more info: https://fake.ghe.domain/data-platform/public-data-platform/issues/93

#### 7. Install Grunt requirements

```
$ npm install
```

This installs everything in package.json, all the grunt dependencies are listed here

#### 8. Start Grunt

Run a few grunt commands to test things out:

```
$ grunt uglify

(This is the JS concatenation)

$ grunt less

(CSS processing)

$ grunt html

(HTML processing)

$ grunt

(default grunt job: runs uglify, less, html and starts the server [connect])
```

Now open your browser to:

http://localhost:8000


Only edit files in `src`. When anything is changed, Grunt will lint, test, compile and build everything. [grunt-cfpb-internal](https://fake.ghe.domain/contolini/grunt-cfpb-internal) generates this README. Bump versions in CHANGELOG when appropriate.

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

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

*This file was generated on Wed Aug 14 2013 02:51:01.*
