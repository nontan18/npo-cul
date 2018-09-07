var capitalInput = document.getElementById('capital');
var incomeInput = document.getElementById('income');
var npoTypeCheckboxes = document.getElementsByName('npoType');
var resultSpace = document.getElementById('result');
var generalLossFomulaSpace = document.getElementById('generalLossFomula');
var certificatedLossFomulaSpace = document.getElementById('certificatedLossFomula');

function fire($this){
  // alert($this.value);
  var capital = getCapital();
  var income = getIncome();
  var npoIsCertificated = getNpoIsCertificated();

  var generalLoss = culculateGeneralLoss(capital, income);
  var certificatedLoss = (npoIsCertificated ? culculateCertificatedLoss(capital, income) :0);


  console.log('generalLoss:', generalLoss)
  console.log('certificatedLoss:', certificatedLoss)

  setGeneralLossFomula(npoIsCertificated, capital, income, generalLoss)
  setCertificatedLossFomula(npoIsCertificated, capital, income, certificatedLoss)

  var result = generalLoss + certificatedLoss;

  setResult(result);

}

function culculateGeneralLoss(capital, income){
  /*
  一般の寄附金に係る損金算入限度額
  資本がある法人(期末資本金の額×0.25％＋所得金額※×2.5％)×1/4
  資本がない法人　所得金額※×1.25％
  */
  var rate = (capital==0 ? 1 : 1/4);
  return ( capital * 0.25 / 100 + income * 2.5 / 100 ) * rate
}

function culculateCertificatedLoss(capital, income){
  /*
  認定・特例認定ＮPO法人に対する寄附金に係る損金算入限度額
  資本がある法人(期末資本金の額×0.375％＋所得金額※×6.25％)×1/2
  資本がない法人　所得金額※×6.25％
  */
  var rate = (capital==0 ? 1 : 1/2);
  return ( capital * 0.375 / 100 + income * 6.25 / 100 ) * rate
}

function number2text(number){
  return addFigure(number.toString());
}

function getNumber(elm){
  var value = toHalfWidth(elm.value);
  value = delFigure(value);
  return value
}

function getCapital(){
  return getNumber(capitalInput);
}

function getIncome(){
  return getNumber(incomeInput);
}

function getNpoIsCertificated(){
  var value = '';
  for (var i=npoTypeCheckboxes.length; i--;){
  	if (npoTypeCheckboxes[i].checked){
  		value = npoTypeCheckboxes[i].value;
  		break;
  	}
  }
  if (value == 'certificatedNPO'){
    return true
  }else{
    return false
  }
}

function setGeneralLossFomula(npoIsCertificated, capital, income, loss){
  var text = '';
  var capital_str = number2text(capital);
  var income_str = number2text(income);
  var loss_str = number2text(loss);

  if (capital==0){
    text = income_str + '×1.25% = ' + loss_str;
  }else{
    text = '(' + capital_str + '×0.25%＋' + income_str + '×2.5%)×1/4 = ' + loss_str;
  }
  generalLossFomulaSpace.innerHTML = text;
}

function setCertificatedLossFomula(npoIsCertificated, capital, income, loss){
  var text = '';
  var capital_str = number2text(capital);
  var income_str = number2text(income);
  var loss_str = number2text(loss);

  if (!npoIsCertificated){
    text = '認定(もしくは特例認定)NPO法人への寄付の場合のみ計算されます。'
    certificatedLossFomulaSpace.innerHTML = text;
    return
  }

  if (capital==0){
    text = income_str + '×6.25% = ' + loss_str;
  }else{
    text = '(' + capital_str + '×0.375%＋' + income_str + '×6.25%)×1/2 = ' + loss_str;
  }
  certificatedLossFomulaSpace.innerHTML = text;
}

function setResult(result){
  resultSpace.innerHTML = addFigure(Math.floor(result).toString());
}
