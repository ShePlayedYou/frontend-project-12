install:
	npm ci
	cd frontend && npm ci


build:
	rm -rf frontend/dist
	npm run build

start:
	npx start-server -s ./frontend/dist
