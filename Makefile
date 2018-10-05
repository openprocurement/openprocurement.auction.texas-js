PREFIX=openprocurement.auction.texas-js_
VERSION=$(shell date '+%Y.%m.%d')
RELEASE_FOLDER=${PREFIX}${VERSION}

build_release:
	echo ${VERSION}
	rm -rf ${RELEASE_FOLDER} ${RELEASE_FOLDER}.tar.gz
	echo "Build release static"
	npm run build-release
	echo "Pack static to tar.gz"
	tar -zcvf ${RELEASE_FOLDER}.tar.gz ${RELEASE_FOLDER}
