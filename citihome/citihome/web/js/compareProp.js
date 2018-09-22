/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function compareFunction() {
    var propA = document.getElementById("PropertyAinput").value;
    var propB = document.getElementById("PropertyBinput").value;
//    console.log(propB);
    squarefoot.load("sqftmain",{
        task: "project", name: propA, type: "h", map: "1", subtype: "mnopqrs", summary: "1",nearby: "1,1,0,"+propB
    });
    $("#sqftmain").iFrameResize();
}