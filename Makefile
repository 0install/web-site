HTML = 0install-2.0.html \
       deb2zero.html \
       dev-site.html \
       get-involved.html \
       install-python.html \
       legal.html \
       news.html \
       roadmap.html \
       survey.html \
       why-not.html

all: htmlfiles
	(ls *.html; find python-api -name '*.html') | sed 's!^\(\./\)\?!http://0install.net/!' | grep -v /google > sitemap.txt

htmlfiles: ${HTML}

%.html: %.xml to_html.xsl structure.xml
	xsltproc -o $@ --stringparam file "$@" to_html.xsl "$<"

linklint:
	linklint -error -warn -xref -forward -http -host 0install.net /@
