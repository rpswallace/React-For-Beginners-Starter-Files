export function getBalanceNotification(percentage) {
  let tagClass = '';
  if(!isNaN(percentage)){
    if(percentage >= 0 && percentage <= 24){
      tagClass= 'tag-danger';
    }
    else if(percentage >= 25 && percentage <= 49){
      tagClass= 'tag-warning';
    }
    else if(percentage >= 50 && percentage <= 75){
      tagClass= 'tag-info';
    }
    else{
      tagClass= 'tag-success';
    }
  }
  return tagClass;
}