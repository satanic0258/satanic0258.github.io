#!/bin/bash
cd `dirname $0`
filename=`basename $0`
# 引数が2つあるか確認
if [ $# -ne 2 ]; then
	echo "Usage: $filename [tag-id] [tag-name]" 1>&2
	exit 1
fi
# 既に同じタグを作っていないか確認
if [ -e ../tags/$1 ]; then
	echo "Tag \"$1\" already exists!"
	exit 1
fi
# タグを作る
echo "$1: $2" >> ../_data/tagmap.yml
cd ../tags/
mkdir $1
cd $1
{
	echo "---"
	echo "layout: tagpage"
	echo "tag: $1"
	echo "description: $2に関する記事です．"
	echo "---"
} > "index.html"
exit 0
