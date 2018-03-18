# -*- Makefile -*-

GO_IMPORTS = archive \
	     deb \
	     recipe \
	     repository \
	     cmd/mkdeb

all: build

clean:
	rm -rf dist/ yarn-error.log

clean-all: clean
	rm -rf node_modules/

build: node_modules
	yarn build
	for import in $(GO_IMPORTS); do \
		install -m 0755 -d dist/$$import && \
		sed -e "s|%PATH%|$$import|g" src/import.html >dist/$$import/index.html; \
	done

release: clean
	git stash save before-gh-pages
	make build
	git checkout gh-pages
	cp -rf dist/* .
	rm -rf dist

node_modules:
	yarn install
