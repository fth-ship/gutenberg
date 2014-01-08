pack:
	zip -r gutenberg.nw \
				 package.json \
				 index.html \
				 index.js \
				 index.css \
				 module \
				 node_modules

run:
	nw gutenberg.nw
