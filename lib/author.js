let db = require('./db.js');
const url = require('url');
let template = require('./template.js')
const qs = require('querystring');


exports.home=function(request, response){
    db.query(`SELECT * FROM topic`, function(err,topics){
        if(err){throw err};
        db.query(`SELECT * FROM author`, function(err2, authors){
            if(err2){throw err2};
            var title = 'author';
            var list = template.list(topics);
            var html = template.HTML(title, list,
            `
             ${template.authorTable(authors)}
              <style>
              table{
                  border-collapse: collapse;
              }
              th,td{
                  border:1px solid black;
              }
                </style>
                <form action="create_author_process" method="post">
              <p>
                <input type="text" name="name" placeholder="name">
              </p>
              <p>
                <textarea name="profile"></textarea>
              </p>
              <p>
                <input type="submit" value="submit">
              </p>
            </form>
            `,
            ``
            );
            response.writeHead(200);
            response.end(html);
        });
    });
}

exports.create_process=function(request, response){
    let body="";
    request.on('data', function(data){
      // 버퍼로 데이터를 받음 그래서 하나씩 붙여줘야 함 
      body+=data;
    })
    request.on('end',function(){
      let parsing=qs.parse(body);
      db.query(`insert into author values(null,?,?)`,[parsing.name,parsing.profile], function(err, result){
        if(err){throw err};
        response.writeHead(302,{Location:'/author'});
        response.end();
      });
    });
}

exports.update=function(request, response){
        let _url = request.url;
        let queryData = url.parse(_url,true).query;
        db.query(`SELECT * FROM topic`, function(err,topics){
        if(err){throw err};
        db.query(`SELECT * FROM author`, function(err2, authors){
            if(err2){throw err2};
            db.query(`SELECT * FROM author where id=?`,[queryData.id],function(err3,author){
                if(err3){throw err3};
                var title = 'author';
                var list = template.list(topics);
                var html = template.HTML(title, list,
                `
                    ${template.authorTable(authors)}
                    <style>
                    table{
                        border-collapse: collapse;
                    }
                    th,td{
                        border:1px solid black;
                    }
                    </style>
                    <form action="/author/update_process" method="post">
                    <input type="hidden" name="id" value="${author[0].id}">
                    <p>
                    <input type="text" name="name" value="${author[0].name}">
                    </p>
                    <p>
                    <textarea name="profile">${author[0].profile}</textarea>
                    </p>
                    <p>
                    <input type="submit" value="submit">
                    </p>
                </form>
                `,
                ``
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    });
}

exports.update_process=function(request, response){
    let body = '';
    request.on('data',function(data){
        body+=data;
    });
    request.on('end',function(){
        let info = qs.parse(body);
        db.query(`UPDATE author SET NAME=?, PROFILE=? WHERE id=?`,[info.name,info.profile,info.id],function(err, result){
            if(err){throw err};
            response.writeHead(302,{Location: `/author/update?id=${info.id}`});
            response.end();
        })
    });
}

exports.delete_process=function(request, response){
    // let flag=confirm('정말 삭제하시겠습니까?');
    let flag=true;
    if(flag){
        let param="";
        request.on('data',(data)=>{
            param+=data;
        });
        request.on('end',()=>{
            let datas=qs.parse(param);
            db.query(`DELETE FROM author WHERE id=?`,[datas.id],(err,result)=>{
                if(err){throw err};
                if(result.changedRows === 1){
                    // response.send('<script type="text/javascript">alert("삭제가 완료 되었습니다.")</script>');
                    // alert('삭제가 완료 되었습니다.');
                }else{
                    // response.send('<script type="text/javascript">alert("작업 도중 에러가 발생했습니다. 다시 한번 시도하여 주시기 바랍니다.")</script>');
                    // alert('작업 도중 에러가 발생했습니다. 다시 한번 시도하여 주시기 바랍니다.');
                }
            })
        });
    }
    response.writeHead(302,{Location:'/author'});
    response.end();
}