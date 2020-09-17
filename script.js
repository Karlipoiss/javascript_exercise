(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var am_or_pm;

            if (h < 12) {
                am_or_pm = 'AM';
                if (h === 0) {
                    h = 12;
                }
            } else {
                am_or_pm = 'PM';
                if (h > 12) {
                    h = h - 12;
                }
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + am_or_pm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();

        if (document.getElementById("fname").value === "") {
            alert("Palun sisestage eesnimi");
            return;
        }
        if (document.getElementById("lname").value === "") {
            alert("Palun sisestage perekonnanimi");
            return;
        }

        var banks = document.getElementsByName('bank');
        var bank_value = "";
        for(var i = 0; i < banks.length; i++){
            if(banks[i].checked){
                bank_value = banks[i].value;
            }
        }

        if (bank_value === "") {
            alert("Palun valige makseviis");
            banks.focus();
            return;
        }

        var linn = document.getElementById("linn");
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } else {
            var val = linn.value
            var del;
            if (val === 'tln') {
                del = 0.00;
            } else if (val === 'trt') {
                del = 2.50;
            } else if (val === 'nrv') {
                del = 2.50;
            } else {
                del = 3.00
            }
            var present = document.getElementById("v1");
            if (present.checked) {
                del += 5;
            }
            var contactless = document.getElementById("v2");
            if (contactless.checked) {
                del += 1;
            }

            e.innerHTML = Number(del).toFixed(2) + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;
var infobox;

function GetMap() {

    "use strict";

    var tartu = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    var humaliste = new Microsoft.Maps.Location(
        57.809250,
        27.215526
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.059795, 27.068570),
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    var pushpin1 = new Microsoft.Maps.Pushpin(tartu, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    map.entities.push(pushpin1);

    infobox = new Microsoft.Maps.Infobox(humaliste, {
        title: "Talu metsas",
        description: "Hästi tore koht",
        visible: false
    });
    infobox.setMap(map);
    var pushpin2 = new Microsoft.Maps.Pushpin(humaliste, {
        title: 'Humaliste talu',
    });
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin2);
}

function pushpinClicked() {
    infobox.setOptions({
        visible: true
    });
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

