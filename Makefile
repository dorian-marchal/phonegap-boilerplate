# Extract the translatable strings in www/locales/default/translation.json
# Require i18next-parser : npm install -g i18next-parser
i18n-extract:
	node_modules/i18next-parser/bin/cli.js www/js -k "::" -s ":::" -f "__.t" -o www/locales -r -l default
	@rm -f www/locales/default/translation_old.json

# Extract the translatable strings for given locales
# Usage: make i18n-extract-locale l=fr
i18n-extract-locale:
	node_modules/i18next-parser/bin/cli.js www/js -k "::" -s ":::" -f "__.t" -o www/locales -r -l $(l)
	@rm -f www/locales/$(l)/translation_old.json

# Generate icons and splashscreens.
# If you're patient enough you may want to
# replace this by a simpler set of commands
#
# The following files must exist :
# - resources/icon.png (1024 x 1024)
# - resources/splash.png (2208 x 2208)
generate-resources:
	# keep a backup of the config file
	cp config.xml config.xml.generation-backup
	node_modules/ionic/bin/ionic resources
	# Remove useless resources
	rm -f resources/android/splash/drawable-land*
	rm -f resources/android/splash/drawable-port-xx*
	rm -f resources/android/icon/drawable-xx*
	# Restore the config file (edited by ionic resources)
	cp config.xml.generation-backup config.xml
	rm config.xml.generation-backup

# Extract the translatable strings and build the app
build:
	# Export needed dependencies
	cp bower_components/requirejs/require.js www/js/lib/
	cp bower_components/jquery/dist/jquery.min.js www/js/lib/
	cp bower_components/backbone/backbone.js www/js/lib/
	cp bower_components/underscore/underscore-min.js www/js/lib/
	cp bower_components/text/text.js www/js/lib/
	cp bower_components/fastclick/lib/fastclick.js www/js/lib/
	cp bower_components/domReady/domReady.js www/js/lib/
	cp bower_components/async/lib/async.js www/js/lib/
	cp bower_components/i18next/i18next.js www/js/lib/
	cp bower_components/gmaps.js/gmaps.js www/js/lib/
	cp bower_components/requirejs-plugins/src/async.js www/js/lib/gm_async.js

	# Phonegap build
	phonegap build

	# Requirejs Optimizer
	cd www && r.js -o build.js

# Prepare the repo to start developing
install-dev:
	npm install
	./dev-scripts/install-dev

.PHONY: i18n-extract i18n-extract-locale build install-dev generate-resources
