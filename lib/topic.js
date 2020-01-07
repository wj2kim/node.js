let db = require('./db.js');
var template = require('./template.js');

exports.home=function(request, response){
    db.query(`SELECT * FROM topic`, function(err,topics){
        if(err){throw err};
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
    });
}