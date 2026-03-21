.PHONY: docs run

build:
	@echo "build..."
	cd react-app;pnpm run build
dev:
	@echo "dev..."
	cd react-app;pnpm run dev
docs:
	@echo "docs..."
	docsify serve docs
