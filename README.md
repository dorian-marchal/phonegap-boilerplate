# Phonegap Boilerplate

A boilerplate to develop Phonegap based apps with Backbone / RequireJS.  
It must be coupled to a [Phonegap Boilerplate Server](https://github.com/dorian-marchal/phonegap-boilerplate-server).

### Set up a project

#### Requirements

- A global installation of `phonegap`
- A global installation of `node` (or `io`)

#### Client

- Create an empty repository for your project, clone it and add a commit to it

```bash
git clone <your-repo>
cd <your-repo>
g c --allow-empty -m "Let's go !" 
```

- Configure a `pb-core` branch representing the Phonegap Boilerplate

```bash
# Let's say we want a `dev` branch
git checkout -b dev
git remote add pb-core git@github.com:dorian-marchal/phonegap-boilerplate.git
git checkout -b pb-core
# We will pull the master branch.
# You may want to pull dev if you want newer changes
git pull --rebase pb-core master 
```

- Merge the core in your `dev` branch and start coding :)

```bash
git checkout dev
git merge pb-core -m 'Use Phonegap Boilerplate'
```

- Set up the dev environment

```bash
make install-dev
```

- Duplicate and edit the default config files

```bash
cp www/js/config.js.default www/js/config.js
nano www/js/config.js

cp config.xml.default config.xml
nano config.xml
```

#### Server (same steps)

- Create an empty repository for your project server, clone it and add a commit to it

```bash
git clone <your-repo>
cd <your-repo>
g c --allow-empty -m "Let's go !" 
```

- Configure a `pb-core` branch representing the Phonegap Boilerplate Server

```bash
# Let's say we want a `dev` branch
git symbolic-ref HEAD refs/heads/dev
git remote add pb-core git@github.com:dorian-marchal/phonegap-boilerplate-server.git
git checkout -b pb-core
# We will pull the master branch.
# You may want to pull dev if you want newer changes
git pull --rebase pb-core master 
```

- Merge the core in your `dev` branch and start coding :)

```bash
git checkout dev
git merge pb-core -m 'Use Phonegap Boilerplate Server'
```

- Set up the dev environment

```bash
make install-dev
```

- Duplicate and edit the default config files

```bash
cp config.js.default config.js
nano config.js
```

### Update the boilerplate

*Coming soon*

### Build the app (dist)

```bash
make build
```
