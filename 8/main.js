
var A = document.getElementById("boxA");
var B = document.getElementById("boxB");
var operator = document.getElementById("select");
var resultAB = document.getElementById("result");


var calculator = function (){

  if (A.value == "" || B.value == ""){ resultAB.value = ""}
    
    else {var option = operator.value;

    if (option == "+"){
      valA = parseFloat(A.value);
      valB = parseFloat(B.value);
      resultAB.value = valA + valB;
    }
    else if (option == "-"){
      valA = parseFloat(A.value);
      valB = parseFloat(B.value);
      resultAB.value = valA - valB;
    }
    else if (option == "*"){
      valA = parseFloat(A.value);
      valB = parseFloat(B.value);
      resultAB.value = valA * valB;
    }
    else if (option == "/"){
      valA = parseFloat(A.value);
      valB = parseFloat(B.value);
      resultAB.value = valA / valB;
    } 
  }
};

operator.addEventListener ("change", function(){
    
  calculator()
  
});

A.addEventListener ("input", function(){
    
  calculator()
  
});

B.addEventListener ("input", function(){
    
  calculator()
  
});