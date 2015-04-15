# Set up a project

#### Requirements

- A global installation of `phonegap` (tested with version `4.2.0-0.25.0`)
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

- Duplicate and edit the default config file

```bash
cp www/js/config.js.default www/js/config.js
nano www/js/config.js
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

### Update the boilerplate (client and server)

To update Phonegap Boilerplate, you must use the `pb` CLI included in this repo. For simpler usage, add `dev-scripts/cli` in your `PATH`.
The `pb` command must be used from the project root.

__Update branch `pb-core` : `pb update`__

On the `pb-core` branch, this command pulls changes of the configured remote branch and pushes them on `origin/pb-core`.

__Merge boilerplate code in your project : `pb merge`__

On the branch targetted by the merge, this command merges `pb-core` in one big commit but doesn't commit. You have to manually commit the changes after running this command.

__Improve Phonegap Boilerplate : `pb push`__

If you have the permission to do so, you can improve Phonegap Boilerplate directly on `pb-core` and push your modifications on both `pb-core (remote)` and `origin` with the command `pb push`.
Be careful with this command (only use it if you know what you are doing).

### Build the app (dist)

```bash
make build
```
