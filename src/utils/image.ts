export const downloadImageFromBase64 = (base64Data: string, name: string) =>{
    var a = document.createElement("a"); //Create <a>
    a.href = base64Data; //Image Base64 Goes here
    a.download = name; //File name Here
    a.click(); //Downloaded file
}
