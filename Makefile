# Extract the translatable strings in www/locales/default/translation.json
# Require i18next-parser : npm install -g i18next-parser
i18n-extract:
	i18next www/js -k "::" -s ":::" -f "__.t" -o www/locales -r -l default
	@rm -f www/locales/default/translation_old.json

# Extract the translatable strings for given locales
# Usage: make i18n-extract l="fr en de"
i18n-extract-locales:
	i18next www/js -k "::" -s ":::" -f "__.t" -o www/locales -r -l $(l)

# Extract the translatable strings and build the app
build:
	make i18n-extract
	phonegap build
