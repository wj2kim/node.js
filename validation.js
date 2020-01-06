function validateForm(){
    console.log("여기 옴?");
    let con=confirm("정말 삭제 하시겠습니까?");
    if(con){
      return true;
    }
    return false;
  }