#!/bin/sh
# ============================================================
# Synology DSM 7 Package INFO
# All required fields per DSM Developer Guide 7
# ============================================================

package="MarkdownEditor"
version="1.0.0-0001"
os_min_ver="7.0-40000"
description="Professional Markdown editor built with Vue 3 + TypeScript, featuring real-time preview, syntax highlighting, and document management."
arch="noarch"
maintainer="DSM Developer"
maintainer_url="https://github.com/example/dsm-markdown-editor"

# Optional display fields
displayname="Markdown Editor"
description_zhtw="專業的 Markdown 編輯器，基於 Vue 3 + TypeScript 構建。"
description_zhcn="专业的 Markdown 编辑器，基于 Vue 3 + TypeScript 构建，支持实时预览和文档管理。"

# DSM integration — links ui/ into DSM webman/3rdparty/MarkdownEditor/
dsmuidir="ui"
dsmappname="SYNO.SDS.MarkdownEditor"
dsmapppage="SYNO.SDS.MarkdownEditor.Main"
dsmapplaunchname="SYNO.SDS.MarkdownEditor"

# Package Center metadata
thirdparty="yes"
support_url="https://github.com/example/dsm-markdown-editor/issues"
beta="false"

# DSM 7: PACKAGE_ICON.PNG must be 64×64 (breaking change from 72×72)
# icons: PACKAGE_ICON.PNG (64x64), PACKAGE_ICON_256.PNG (256x256)