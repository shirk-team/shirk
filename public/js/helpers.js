/**
 * Replace the contents of the page with a different HTML file.
 * @param  {String} html The new HTML for the page.
 */
function overwritePage(html) {
    var doc = document.open('text/html', 'replace');
    doc.write(html);
    doc.close();
}