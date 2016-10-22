const osmosis = require('osmosis');
const url = "http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html"

osmosis
.get(url)
.find('h1 + div a')
.set('location')

.set({
    'title':        'section > h2',
    'description':  '#postingbody',
    'subcategory':  'div.breadbox > span[4]',
    'date':         'time@datetime',
    'latitude':     '#map@data-latitude',
    'longitude':    '#map@data-longitude',
    'images':       ['img@src']
})
.data(function(listing) {
    // do something with listing data
})
.log(console.log)
.error(console.log)
.debug(console.log)
