function convertToCamelCase(text) {

    // 언더스코어로 구분된 문자열을 카멜 케이스로 변환합니다.

    const words = text.split('_');

    let camelCase = '';

    for (let i = 0; i < words.length; i++) {

        const word = words[i];

        if (i === 0) {

            camelCase += word.toLowerCase();

        } else {

            camelCase += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

        }

    }

    return camelCase;

}

function displayValues() {

    // 입력된 값들을 가져와서 출력합니다.
    let columnId = document.getElementById("columnId").value;
    const arrId = columnId.split("\n");

    let columnName = document.getElementById("columnName").value;
    const arrName = columnName.split("\n");

    let columnType = document.getElementById("columnType").value;
    const arrType = columnType.split("\n");

    const dtoType = document.getElementById("selectType").value;

    let outputText = "";
    let arrModelDto = [];
    
    arrId.forEach(function(input, index) {
        if(input != ""){
    
            if(dtoType == 'dto'){
                if(index == 0){
                    outputText += "@Id \n";
                }
                outputText += "@Column(name=\""+input+"\") \n";
                outputText += "@Schema(description=\""+arrName[index]+"\") \n";
                outputText += makeType(arrType[index], input, outputText);
            }else{
                arrModelDto.push(input);
    
                if(isDuplicate(arrModelDto) == false){
                    outputText += "@Schema(description=\""+arrName[index]+"\") \n";
                    outputText += makeType(arrType[index], input, outputText);
                }
            }
        }
    });

    // 결과를 출력할 div에 HTML을 설정합니다.
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = outputText.replace(/\n/g, "<br>");
}

function selectType(type){
    let returnType = "";

    if(type.includes('VARCHAR')){
        returnType = "String ";
    }else if(type.includes("NUMBER")){
        returnType = "int ";
    }else if(type.includes("TIME")){
        returnType = "Timestamp ";
    }else if(type.includes("DATE")){
        returnType = "Date ";
    }else if(type.includes("CLOB")){
        returnType = "String ";
    }else {
        returnType = "@확인필요 ";
    }

    return returnType;
}

function copyValues() {
    const output = document.getElementById("output").innerText;
    // textarea의 내용을 복사한다.
    navigator.clipboard.writeText(output).then(() => {
    // 복사가 완료되면 호출된다.
    alert("복사완료");
    });
}

function isDuplicate(arr){
    const arrayToSet = new Set(arr);

    if(arr.length != arrayToSet.size){
        arr.pop();
        return true;
    }else{
        return false;
    }
}

function makeType(arrType, input){
    let type = selectType(arrType);
    let outputText = '';

    if(input.indexOf('_') == -1){
        outputText += "private " + type + input.toLowerCase() + ";\n\n";
        
    }else{
        outputText += "private " + type + convertToCamelCase(input) + ";\n\n";
    }
    return outputText;
}