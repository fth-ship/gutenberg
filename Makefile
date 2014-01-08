pack:
	zip -r gutenberg.nw \
				 package.json \
				 index.html \
				 index.js \
				 index.css \
				 images \
				 module \
				 config \
				 node_modules \
				 bower_components

run:
	nw gutenberg.nw
