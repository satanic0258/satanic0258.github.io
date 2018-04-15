#!/bin/bash
cd `dirname $0`
# 引数が1つあるか確認
if [ $# -ne 1 ]; then
	echo "Usage: $filename [tag-id]" 1>&2
	exit 1
fi
# 指定したタグがあるか確認
if [ ! -e ../tags/$1 ]; then
	echo "Tag \"$1\" does not exists!"
	exit 1
fi
# タグを消す
sed -i "/^$1:.*\$/d" ../_data/tagmap.yml
rm -R "../tags/$1"
exit 0
