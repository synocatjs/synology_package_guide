#!/bin/bash
# Copyright (c) 2000-2020 Synology Inc. All rights reserved.

source /pkgscripts/include/pkg_util.sh

# 包信息
package="mini-app"
version="1.0.0"

# 使用 pkg_get_platform_family 获取架构（返回 x86_64）
arch="$(pkg_get_platform_family)"

maintainer="Synocatjs"
distributor="Synocatjs"
description="A minimal Synology DSM package demo"
displayname="Mini App"
os_min_ver="7.0-40000"

# 可选字段
silent_install="yes"
silent_upgrade="yes"
silent_uninstall="yes"

# 生成 INFO 文件
pkg_dump_info