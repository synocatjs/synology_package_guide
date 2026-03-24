.PHONY: docs run

build:
	@echo "build..."
	cd react-demo-app;pnpm run build
dev:
	@echo "dev..."
	cd react-demo-app;pnpm run dev
docs:
	@echo "docs..."
	docsify serve docs