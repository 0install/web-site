HTML = index.html \
       0install-2.0.html \
       deb2zero.html \
       dev-site.html \
       doc.html \
       get-involved.html \
       injector-feeds.html \
       injector.html \
       install-linux.html \
       install-mac.html \
       install-osx.html \
       install-source.html \
       install-python.html \
       install-unix.html \
       install-windows.html \
       legal.html \
       news.html \
       packagers.html \
       roadmap.html \
       support.html \
       survey.html \
       users.html \
       why-not.html

all: htmlfiles
	(ls *.html; find python-api -name '*.html') | sed 's!^\(\./\)\?!http://0install.net/!' | grep -v /google > sitemap.txt

htmlfiles: ${HTML}

%.html: %.xml to_html.xsl structure.xml
	xsltproc -o $@ --stringparam file "$@" to_html.xsl "$<"

lists/%.xml: lists/%.lst
	./lists/make-list.py $<

index.html: index.xml news.xml

injector-feeds.html: lists/featured.xml lists/0tools.xml

linklint:
	linklint -error -warn -xref -forward -http -host 0install.net /@
