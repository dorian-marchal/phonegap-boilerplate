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
	phonegap build

# Prepare the repo to start developing
install-dev:
	npm install
	./dev-scripts/install-dev

.PHONY: i18n-extract i18n-extract-locales build install-dev
