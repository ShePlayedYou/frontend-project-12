install:
	npm ci
	cd frontend && npm ci

build:
	rm -rf frontend/dist
	npm run build

start:
	npm start
