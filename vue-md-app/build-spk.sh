#!/usr/bin/env bash
# ============================================================
# DSM Markdown Editor — SPK Build Script
# Follows Synology DSM 7 Package Developer Guide
#
# Usage:
#   cd dsm-md-editor/ui && npm run build
#   cd .. && bash scripts/build-spk.sh
# ============================================================

set -euo pipefail

PACKAGE_NAME="MarkdownEditor"
PACKAGE_VERSION="1.0.0-0001"
ARCH="noarch"
OUTPUT_DIR="./dist"
SPK_NAME="${PACKAGE_NAME}-${ARCH}-${PACKAGE_VERSION}.spk"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'

log_info()    { echo -e "${BLUE}[INFO]${NC} $*"; }
log_success() { echo -e "${GREEN}[OK]${NC}   $*"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error()   { echo -e "${RED}[ERR]${NC}  $*"; exit 1; }

# ---- 1. Validate prerequisites ----
log_info "Checking prerequisites..."

[ -f "INFO.sh" ]        || log_error "INFO.sh not found. Run from project root."
[ -d "conf" ]           || log_error "conf/ directory missing."
[ -f "conf/privilege" ] || log_error "conf/privilege missing (required by DSM 7)."
[ -d "scripts" ]        || log_error "scripts/ directory missing."
[ -d "ui/dist" ]        || log_error "ui/dist/ not found. Run 'cd ui && npm run build' first."

log_success "Prerequisites OK"

# ---- 2. Generate INFO file from INFO.sh ----
log_info "Generating INFO file..."
mkdir -p "${OUTPUT_DIR}/pkg_root"
bash INFO.sh 2>/dev/null || true

# Build INFO key=value file (DSM format, no 'export', no '#!/bin/sh')
grep -E '^[a-zA-Z_]+=".+"' INFO.sh | sed 's/^export //' > "${OUTPUT_DIR}/pkg_root/INFO"
log_success "INFO generated"

# ---- 3. Build package.tgz ----
log_info "Building package.tgz..."
PACK_STAGING=$(mktemp -d)
mkdir -p "${PACK_STAGING}/ui"

# Copy built Vue app into package.tgz/ui/ (dsmuidir="ui")
cp -r ui/dist/. "${PACK_STAGING}/ui/"

# Copy nginx config
cp nginx.conf "${PACK_STAGING}/nginx.conf"

# Create package.tgz
tar -czf "${OUTPUT_DIR}/pkg_root/package.tgz" -C "${PACK_STAGING}" .
rm -rf "${PACK_STAGING}"
log_success "package.tgz created ($(du -sh "${OUTPUT_DIR}/pkg_root/package.tgz" | cut -f1))"

# ---- 4. Copy conf/, scripts/, wizard/ ----
log_info "Copying package structure..."
cp -r conf    "${OUTPUT_DIR}/pkg_root/"
cp -r scripts "${OUTPUT_DIR}/pkg_root/"
cp -r wizard  "${OUTPUT_DIR}/pkg_root/"

# Ensure scripts are executable
chmod +x "${OUTPUT_DIR}/pkg_root/scripts/"*

# ---- 5. Copy icons (if present) ----
for icon in PACKAGE_ICON.PNG PACKAGE_ICON_256.PNG; do
    if [ -f "${icon}" ]; then
        cp "${icon}" "${OUTPUT_DIR}/pkg_root/${icon}"
        log_success "Icon: ${icon}"
    else
        log_warn "${icon} not found — package will have no icon in Package Center."
    fi
done

# ---- 6. Pack into .spk ----
log_info "Packing ${SPK_NAME}..."
mkdir -p "${OUTPUT_DIR}"
tar -czf "${OUTPUT_DIR}/${SPK_NAME}" -C "${OUTPUT_DIR}/pkg_root" .
rm -rf "${OUTPUT_DIR}/pkg_root"

# ---- 7. Verify ----
SPK_SIZE=$(du -sh "${OUTPUT_DIR}/${SPK_NAME}" | cut -f1)
log_success "Build complete!"
echo ""
echo -e "  ${GREEN}Package:${NC} ${OUTPUT_DIR}/${SPK_NAME}"
echo -e "  ${GREEN}Size:${NC}    ${SPK_SIZE}"
echo ""
echo -e "  ${BLUE}Install via:${NC}"
echo -e "    DSM → Package Center → 手动安装 → 选择 .spk"
echo -e "    或: synopkg install ${SPK_NAME}"
echo ""
