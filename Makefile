install:
	npm ci
	make -C frontend install

build:
	rm -rf frontend/dist
	npm run build
	make -C frontend start

start:
	npx start-server -s ./frontend/dist
