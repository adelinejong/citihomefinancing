/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
//     https://www.iproperty.com.sg/sale/district-01/hdb/?bedroom=2&minPrice=100000&maxPrice=600000&minBuiltupSize=500&maxBuiltupSize=2000     
    $("#searchProp").click(function(){
        $('#displayProp').html("");
        document.getElementById("loadergif").style.display = "block";
        var locations = document.getElementById("location");
        var strLoc = locations.options[locations.selectedIndex].value;

        var proptype = document.getElementById("property-type");
        var strProp = proptype.options[proptype.selectedIndex].value;

        var bedroom = document.getElementById("bedroom");
        var strBedroom = bedroom.options[bedroom.selectedIndex].value;

        var priceRangeMin = $("#range").data("ionRangeSlider").result.from;
        var priceRangeMax = $("#range").data("ionRangeSlider").result.to;

        var areaRangeMin = $("#range2").data("ionRangeSlider").result.from;
        var areaRangeMax = $("#range2").data("ionRangeSlider").result.to;
        $.support.cors = true;
        var request = $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://www.iproperty.com.sg/sale/' + strLoc +"/"+ strProp,
            type: 'GET',
//            xhrFields: {
//                withCredentials: true
//            },
//            crossDomain: true,
//            headers: {
//                'Content-Type': 'application/x-www-form-urlencoded'
//            },
//            headers: {  
//                'Access-Control-Allow-Origin': ["https://www.iproperty.com.sg", "*"] },
            data: { bedroom: strBedroom, minPrice : priceRangeMin, maxPrice : priceRangeMax, minBuiltupSize : areaRangeMin, maxBuiltupSize : areaRangeMax}
        });
        
        request.done(function(data) {
//            console.log(data);
//            data = $(data).find('div.kLHllD');
//            console.log($x("//div[contains(@class, 'cdffIT')]"));

            var doc = new DOMParser().parseFromString(data,'text/html');
            console.log(doc);
//            data = $(data[0]).find('div.cdffIT');
//            data = $(data[0]).find('h2.dLCzlh'); 
            var nodesSnapshot = document.evaluate('//div[contains(@class, "dIdCFr")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropName = document.evaluate('//h2[contains(@class, "dLCzlh")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropPrice = document.evaluate('//li[contains(@class, "listing-primary-price-item kigVNh")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropAdd = document.evaluate('//p[contains(@class, "jPjrzv")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropAdd2 = document.evaluate('//div[contains(@class, "fsKEtj")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropRoom = document.evaluate('//div[contains(@class, "eqkyrG")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropBulit = document.evaluate('//a[contains(@class, "attrs-price-per-unit-desktop")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropBedroom = document.evaluate('//li[contains(@class, "attributes-facilities-item-wrapper bedroom-facility jDFLpX")]', doc, null, XPathResult.ANY_TYPE, null );
            var nodesPropBathroom = document.evaluate('//li[contains(@class, "attributes-facilities-item-wrapper bathroom-facility jDFLpX")]', doc, null, XPathResult.ANY_TYPE, null );
          
            console.log(nodesSnapshot);
            var node, nodes = []
            while (node = nodesSnapshot.iterateNext())
              nodes.push(node);
//            console.log(nodes);
            
            var node2, nodes2 = []
//            console.log(nodes2.length);
            while (node2 = nodesPropName.iterateNext())
                nodes2.push(node2.textContent);
            
//            console.log(nodes2);
            
            var node3, nodes3 = []
            while (node3 = nodesPropPrice.iterateNext())
                if(nodes3.length !== 0){
                    if(nodes3[nodes3.length-1] !== node3.textContent){
                        nodes3.push(node3.textContent);
                    }
                }else{
                    nodes3.push(node3.textContent);
                }
            console.log(nodes3);
            
            var node4, nodes4 = []
            while (node4 = nodesPropAdd.iterateNext())
                nodes4.push(node4.textContent);
//            console.log(nodes4);
            
            var node5, nodes5 = []
            while (node5 = nodesPropAdd2.iterateNext())
                nodes5.push(node5.textContent);
//            console.log(nodes5);
            
            var node6, nodes6 = []
            while (node6 = nodesPropRoom.iterateNext())
                nodes6.push(node6.textContent);
//            console.log(nodes6);
            
            var node7, nodes7 = []
            while (node7 = nodesPropBulit.iterateNext())
                nodes7.push(node7.textContent);
//            console.log(nodes7);
            
            var firstrow = document.createElement("div");
            firstrow.className = "row";
            
            var i = 0;
            for(i; i<nodes2.length; i++){
                var secondEle = document.createElement("div");
                secondEle.className = "col-lg-6";
                
                firstrow.appendChild(secondEle);
                var singleProp = document.createElement("div");
                singleProp.className = "single-property";
                secondEle.appendChild(singleProp);

//                var imgContent = document.createElement("div");
//                imgContent.className = "images";
//                singleProp.appendChild(imgContent);
//
//                var imgContentImg = document.createElement("img");
//                imgContentImg.className = "img-fluid mx-auto d-block";
//                imgContentImg.src = "img/property.png";
//                imgContent.appendChild(imgContentImg);

                var singleDesc = document.createElement("div");
                singleDesc.className = "desc";
                singleProp.appendChild(singleDesc);

                var singleDescTitle = document.createElement("div");
                singleDescTitle.className = "top d-flex justify-content-between";
                singleDesc.appendChild(singleDescTitle);

                var singleDescTitleText = document.createElement("h4");
                var singleDescPriceText = document.createElement("h4");

                singleDescTitleText.appendChild(document.createTextNode(nodes4[i]));
                singleDescPriceText.appendChild(document.createTextNode(nodes3[i]));
                singleDescTitle.appendChild(singleDescTitleText);
                singleDescTitle.appendChild(singleDescPriceText);


                var singleDescMiddle = document.createElement("div");
                singleDescMiddle.className = "middle";
                var singleDescMiddleContent = document.createElement("div");
                singleDescMiddleContent.className = "d-flex justify-content-start";
                var singleDescMiddleContent2 = document.createElement("div");
                singleDescMiddleContent2.className = "d-flex justify-content-start";

                singleDesc.appendChild(singleDescMiddle);
                singleDescMiddle.appendChild(singleDescMiddleContent);
                singleDescMiddle.appendChild(singleDescMiddleContent2);

                var singleDescContentText = document.createElement("p");
                var singleDescContentText2 = document.createElement("p");
                singleDescContentText.appendChild(document.createTextNode(nodes6[i]));
                singleDescContentText2.appendChild(document.createTextNode(nodes7[i]));
                singleDescMiddleContent.appendChild(singleDescContentText);
                singleDescMiddleContent.appendChild(singleDescContentText2);
                
                var singleDescContentAdd = document.createElement("p");
                var singleDescContentAdd2 = document.createElement("p");
                singleDescContentAdd.appendChild(document.createTextNode(nodes5[i]));
                singleDescContentAdd2.appendChild(document.createTextNode(nodes2[i]));
                singleDescMiddleContent2.appendChild(singleDescContentAdd);
                singleDescMiddleContent2.appendChild(singleDescContentAdd2);
                
                if(i === (nodes2.length-1)){
                    $('#displayProp').html(firstrow);
                    document.getElementById("loadergif").style.display = "none";
                    var node, nodes,node2, nodes2,node3, nodes3,node4, nodes4,node5, nodes5,node6, nodes6,node7, nodes7 = [];
                }
            }
            
            if(nodes2.length == 0){
                var node, nodes,node2, nodes2,node3, nodes3,node4, nodes4,node5, nodes5,node6, nodes6,node7, nodes7 = [];
                var displayNone = document.createElement("h4");
                displayNone.className = "displayNoneProp";
                displayNone.appendChild(document.createTextNode("No Property"));
                $('#displayProp').html(displayNone);
                document.getElementById("loadergif").style.display = "none";
            }
//            <link href="css/ipropertyvendor.css" rel="stylesheet" type="text/css"/>
//            var cssLink = document.createElement("link");
//            cssLink.href = "css/ipropertyvendor.css"; 
//            cssLink.rel = "stylesheet"; 
//            cssLink.type = "text/css"; 
            
//            var scriptLink = document.createElement("script");
//            scriptLink.href = "js/ipropertyvendor.js";
            
//            var iframe = document.createElement('iframe');
//            iframe.width = "1140";
//            iframe.height = "740";
//            iframe.srcdoc = data[0].outerHTML;
//            iframe.appendChild(cssLink);
//            iframe.appendChild(scriptLink);
//            $('#displayProp').html(iframe);
//          $('#displayProp').html("<iframe srcdoc="+data+"></iframe>");
        });

        request.fail(function(jqXHR, textStatus) {
          console.log("failed" + textStatus);
        });
    });
 });

