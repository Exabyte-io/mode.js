[![npm version](https://badge.fury.io/js/%40exabyte-io%2Fmode.js.svg)](https://badge.fury.io/js/%40exabyte-io%2Fmode.js)
[![License: Apache](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

# mode.js

MOdel DEfinitions in JS - mode.js - houses model entity definitions for use in the Mat3ra platform.


### Installation

For usage within a javascript project:

```bash
npm install @exabyte-io/mode.js
```

For development:

```bash
git clone https://github.com/Exabyte-io/mode.js.git
```


### Contribution

This repository is an [open-source](LICENSE.md) work-in-progress and we welcome contributions.

We regularly deploy the latest code containing all accepted contributions online as part of the
[Mat3ra.com](https://mat3ra.com) platform, so contributors will see their code in action there.

See [ESSE](https://github.com/Exabyte-io/esse) for additional context regarding the data schemas used here.

Useful commands for development:

```bash
# run linter without persistence
npm run lint

# run linter and save edits
npm run lint:fix

# compile the library
npm run transpile

# run tests
npm run test
```

MoDe
====

The `MoDe` package is used in conjunction with the `ADe` package to define top-level parameters
present in Subworkflow units in the `WoDe` package ecosystem. The entities provided by `MoDe` are:

- `Method` - See [Method Overview](https://docs.mat3ra.com/methods/overview/) for more details
- `Model` - See [Model Overview](https://docs.mat3ra.com/models/overview/) for more details

