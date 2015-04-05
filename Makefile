# Extract the translatable strings in www/locales/default/translation.json
# Require i18next-parser : npm install -g i18next-parser
i18n-extract:
	node_modules/i18next-parser/bin/cli.js www/js -k "::" -s ":::" -f "__.t" -o www/locales -r -l default
	@rm -f www/locales/default/translation_old.json

# Extract the translatable strings for given locales
# Usage: make i18n-extract l=fr
i18n-extract-locales:
	node_modules/i18next-parser/bin/cli.js www/js -k "::" -s ":::" -f "__.t" -o www/locales -r -l $(l)
	@rm -f www/locales/$(l)/translation_old.json

# Extract the translatable strings and build the app
build: i18n-extract
	cp bower_components/requirejs/require.js www/js/lib/
	cp bower_components/jquery/dist/jquery.min.js www/js/lib/
	cp bower_components/backbone/backbone.js www/js/lib/
	cp bower_components/underscore/underscore-min.js www/js/lib/
	cp bower_components/text/text.js www/js/lib/
	cp bower_components/fastclick/lib/fastclick.js www/js/lib/
	cp bower_components/domReady/domReady.js www/js/lib/
	cp bower_components/async/lib/async.js www/js/lib/
	cp bower_components/i18next/i18next.js www/js/lib/
	mkdir -p www/css/lib/topcoat
	mkdir -p www/css/lib/topcoat/css
	cp bower_components/topcoat/css/topcoat-mobile-light.min.css www/css/lib/topcoat/css
	cp -R bower_components/topcoat/font www/css/lib/topcoat/
	cp -R bower_components/topcoat/img www/css/lib/topcoat/
	phonegap build

# Prepare the repo to start developing
install-dev:
	npm install
	./dev-scripts/install-dev

.PHONY: i18n-extract i18n-extract-locales build install-dev
