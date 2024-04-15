.PHONY: watch test build

watch:
	npm run watch

test:
	cd example && python3 -m http.server 8000

build:
	npm run build
	
