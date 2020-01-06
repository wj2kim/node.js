var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

// using 'Mysql' as project dependency
let mysql = require('mysql');
// mysql과의 연결 매개변수 = 1.host 2.user 3.password 4.database
let db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'2472',
   database:'opentutorials',
});
// mysql과 연결 
db.connect();
 
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        db.query(`SELECT * FROM topic`, function(error,topics){
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
      } else {
        db.query(`SELECT * FROM topic`, function(error,topics){
         if(error){
           throw error;
         }
         db.query(`SELECT * FROM topic LEFT JOIN author on topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function(error2, topic){
           if(error2){
             throw error2;
           }
           console.log(topic);
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>
            ${description}
            <p><b>by</b> ${topic[0].name}</p>`,
            ` <a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
                <form id="needConfirm" action="delete_process" method="post" onsubmit="return validateForm();">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <input type="submit" value="delete">
                </form>
                `
          );
          response.writeHead(200);
          response.end(html);
         })
      });
      }
    } else if(pathname === '/create'){
      db.query('SELECT * FROM topic', function(err,topics){
        if(err) {throw err};
        db.query('SELECT * FROM author',function(err2,authors){
          if(err2){throw err2};
          // let tag=template.selectAuthors(authors);
          var title = 'WEB - create';
          var list = template.list(topics);
          var html = template.HTML(title, list, `
            <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                ${template.selectAuthors(authors)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `, '');
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`INSERT INTO topic values (NULL,?,?,NOW(),?)`,
          [post.title,post.description,post.author],
          function(err,result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          });
      });
    } else if(pathname === '/update'){
      db.query(`SELECT * FROM topic`,function(err,topics){
        if (err){throw err};
        db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(err2,topic){
          if(err2){throw err2};
          db.query(`SELECT * FROM author`,function(err3,authors){
            if(err3){throw err3};
            let list = template.list(topics);
            let html = template.HTML(topic[0].title, list,
              `
              <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p>
              <textarea name="description" placeholder="description">${topic[0].description}</textarea>
              </p>
              ${template.selectAuthors(authors,topic[0].author_id)}
              <p>
              <input type="submit">
              </p>
              </form>
              `,
              `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
              );
              response.writeHead(200);
              response.end(html);
          });
          });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        console.log(post);
          db.query(`update topic set title=?, description=?, author_id=? where id=?`,
          [post.title,post.description,post.author,post.id],
          function(err,result){
            if(err){ throw err};
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          db.query('DELETE FROM TOPIC WHERE id=?',[post.id],function(err,result){
            if(err){ throw err};
            response.writeHead(302,{Location: '/'});
            response.end();
          });
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);

// document.getElementById('needConfirm').addEventListener(function(){
//   console.log("여기 옴?");
//   let con=confirm("정말 삭제 하시겠습니까?");
//   if(con){
//     return true;
//   }
//   return false;
// });
