module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <h4><a href="/author">Author</a></h4>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },

  list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i].id}">${filelist[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },
  // mergerData:function(data)
  
  selectAuthors:function(authors,author_id){
    let tag ="";
    for(let i =0;i<authors.length;i++){
      if(authors[i].id === author_id){
        tag+=`<option value=${authors[i].id} selected>${authors[i].name}</option>`;
      }else{
        tag+=`<option value=${authors[i].id}>${authors[i].name}</option>`;
      }
    }
    return `<select name="author">${tag}</select>`;
  },

  authorTable:function(authors){
    let tag ='<table>';
    for(let i=0;i<authors.length;i++){
      tag+=`
      <tr>
      <th>${i}</th>
      <td>${authors[i].name}</td>
      <td>${authors[i].profile}</td>
      <td><a href="/author/update?id=${authors[i].id}">update</a></td>
      <td>
        <form action="/author/delete_process" method="post">
          <input type="hidden" name="id" value="${authors[i].id}">
          <button type="submit">delete</button>
        </form>
      </td>
      <tr>`;
    }
    tag+='</table>'
    return tag;
  }


}
  