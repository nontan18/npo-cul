function addFigure(numVal) {
  if (numVal == ''){
    return '';
  }
  numVal = toHalfWidth(numVal).replace(/,/g, "").trim();
  // 数値でなければそのまま返却
  if ( !/^[+|-]?(\d*)(\.\d+)?$/.test(numVal) ){
      return numVal
　　}
  // 整数部分と小数部分に分割
  var numData = numVal.toString().split('.');
  // 整数部分を3桁カンマ区切りへ
  numData[0] = Number(numData[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // 小数部分と結合して返却
  return numData.join('.');
}

function delFigure(strVal){
  return strVal.replace( /,/g , "" );
}


function toHalfWidth(strVal){
  var halfVal = strVal.replace(/[！-～]/g,
    function( tmpStr ) {
      return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
    }
  );
  return halfVal;
}

var elms = document.getElementsByClassName('number-input');
for (var i=0;i<elms.length;i++){
  var elm = elms[i];
  elm.addEventListener('blur', function(){ this.value = addFigure(this.value) }, false);
  elm.addEventListener('focus', function(){ this.value = delFigure(this.value) }, false);
}
