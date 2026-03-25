#!/bin/bash
# INFO.sh
source /pkgscripts/include/pkg_util.sh
package="MiniDemo"
version="1.0.0000"
os_min_ver="7.0-40000"
displayname="Mini Demo Package"
description="this is an minimal demo package"
arch="$(pkg_get_unified_platform)"
maintainer="Synocatjs"
pkg_dump_info
