var http = require('http'); 
var fs = require('fs');
var express = require('express')
var app = express()
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('css', __dirname + '/css');
app.use(express.static(__dirname + '/public'));
var markdown = require('markdown').markdown;
var marked = require('marked');

var GitHubApi = require("github");
var github = new GitHubApi({
	version: "3.0.0",
});

not_listed_docs = ['README.md']
listed_doc_contents = []
listed_doc_links = []

github.authenticate({
    type: "oauth",
    token: "6de09d7d6e90307ef0ebf460f97851e0f9ee587b"
});

github.gitdata.getTree({
	user: 'dlsuarez',
	repo: 'odoo-helpers',
	sha: '438a85af22a38a33f54b80c1f21ebb583493d61b'
}, function(err, res) {
	for (id in res.tree) {
		if (not_listed_docs.indexOf(res.tree[id].path) == -1) {
			listed_doc_links.push({
				'path': res.tree[id].path,
				'sha': res.tree[id].sha
			});
			github.gitdata.getBlob({
				user: 'dlsuarez',
				repo: 'odoo-helpers',
				sha: (res.tree[id].sha).toString()
			}, function(err, res) {
				var doc_content = new Buffer(res.content, 'base64');
				listed_doc_contents.push(doc_content.toString('utf8'));
				app.get('/doc=' + res.sha, function (request, response) {
					github.markdown.render({
						text: doc_content.toString('utf8'),
						mode: 'gfm'
					}, function(err, res) {
						fs.readFile('doc.html', function(err) {
							response.writeHead(200, {'Content-Type': 'text/html'});
							response.write(
								"<meta charset='UTF-8'>" +
								"<link rel='stylesheet' type='text/css' href='/css/md.css' media='screen'>" +
								"<link rel='stylesheet' type='text/css' href='/css/docs.css' media='screen'>" +
								"<div class='doc-box'>" + res.data + "</div>"
							);
							response.end();
						});
					});
				})
			});
		}
	}
});

app.get('/docs', function (request, response) {
	fs.readFile('docs.html', function(err) {
		var links = "";
		var title = "";
		links = "<ul>";
		for (id in listed_doc_links) {
			title = listed_doc_links[id].path;
			links = links + "<li><a href='doc=" + listed_doc_links[id].sha + "'>" + title.replace('.md','') + "</a></li>";
		}
		links = links + "</ul>";
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(
			"<meta charset='UTF-8'>" +
			"<link rel='stylesheet' type='text/css' href='/css/md.css' media='screen'>" +
			"<link rel='stylesheet' type='text/css' href='/css/docs.css' media='screen'>" +
			"<div class='doc-box'>" + links + "</div>"
		);
		response.end();
	});
})

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
})