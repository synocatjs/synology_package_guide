#!/bin/bash
# INFO.sh — Synology DSM 7 Package Developer Guide §1.6.1
# Run inside chroot: source /pkgscripts-ng/include/pkg_util.sh
# Then: ./INFO.sh > INFO   (called by SynoBuildConf/install)

source /pkgscripts-ng/include/pkg_util.sh

# ── Necessary fields (§1.6.1.1) ──────────────────────────────
package="MarkdownEditor"
version="1.0.0-0001"
os_min_ver="7.0-40000"
description="A professional Markdown editor for DSM with real-time preview, syntax highlighting, multi-document management, and full keyboard shortcut support."
arch="noarch"
maintainer="Synology Developer"

# ── Optional fields (§1.6.1.2) ───────────────────────────────
displayname="Markdown Editor"
displayname_enu="Markdown Editor"
displayname_chs="Markdown 编辑器"
displayname_cht="Markdown 編輯器"

description_enu="A professional Markdown editor for DSM with real-time preview and syntax highlighting."
description_chs="专业的 Markdown 编辑器，支持实时预览、语法高亮和多文档管理。"

maintainer_url="https://github.com/example/dsm-markdown-editor"
support_url="https://github.com/example/dsm-markdown-editor/issues"

# DSM desktop integration (§1.7.2)
# dsmuidir links package.tgz/ui/ → /usr/syno/synoman/webman/3rdparty/MarkdownEditor/
dsmuidir="ui"
dsmappname="com.example.MarkdownEditor"

# Admin UI (§1.6.1.2 adminport / adminurl / adminprotocol)
adminprotocol="http"
adminport="8585"
adminurl="webman/3rdparty/MarkdownEditor/index.html"

# Install behaviour
silent_install="yes"
silent_upgrade="yes"
silent_uninstall="yes"
thirdparty="yes"
beta="no"

# Guard: only dump when called directly, not sourced
[ "$(caller)" != "0 NULL" ] && return 0
pkg_dump_info