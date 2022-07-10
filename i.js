let search = document.getElementById('searchmineral');
let btn = document.getElementById('btn');

var currentMarkers = [];
let k=-1;
let c=0;




btn.addEventListener('click', (e) => {

    let search = document.getElementById('searchmineral');
    e.preventDefault();


    // remove markers 

    if (currentMarkers !== null) {
        for (var i = currentMarkers.length - 1; i >= 0; i--) {
            currentMarkers[i].remove();
        }
    }
    k=-1;
     c=0;
    updateMap();



})

let info = document.querySelector('.info');
function updateMap() {
    info.innerHTML = "";
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            rsp.data.forEach(element => {
                k++;
                if (element.Mineral.toUpperCase() == search.value.toUpperCase()) {
          c++;
                    latitude = element.Latitude;
                    longitude = element.Longitude;

                   info.style.display="flex";
                   var node2 = document.createElement('li');                 // Create a <li> node
                   info.style.flexWrap="wrap";

                    var node1 = document.createElement('li');                 // Create a <li> node
                    var textnode1 = document.createTextNode("Mines: "+element.Mine);         // Create a text node
                    var textnode2 = document.createTextNode("Mineral: "+element.Mineral);         // Create a text node
                    var node3 = document.createElement('li');                 // Create a <li> node
                    var textnode3 = document.createTextNode("State: "+element.State);         // Create a text node
                    var node4 = document.createElement('li');                 // Create a <li> node
                    var textnode4 = document.createTextNode("Information: "+element.Article);         // Create a text node
                    var node5 = document.createElement('li');        
                    node1.style.marginBottom="1rem";         // Create a <li> node
                    node4.style.flexWrap="wrap";     
                    info.style.width='100%'; // Create a <li> node
                    info.style.background='grey';
                    node2.style.marginBottom="1rem";     // Create a <li> node
                    node3.style.marginBottom="1rem";     // Create a <li> node
                    node4.style.marginBottom="1rem";     // Create a <li> node
                    node5.style.marginBottom="3rem";     // Create a <li> node
                    var textnode5 = document.createTextNode("More_info: "+element.more_info);         // Create a text node
                    node1.appendChild(textnode1);                              // Append the text to <li>
                    node2.appendChild(textnode2);                              // Append the text to <li>
                    node3.appendChild(textnode3);                              // Append the text to <li>
                    node4.appendChild(textnode4);                              // Append the text to <li>
                    node5.appendChild(textnode5);                              // Append the text to <li>
                    info.appendChild(node2);
                    info.appendChild(node1);
                    info.appendChild(node3);
                    info.appendChild(node4);
                    info.appendChild(node5);

                    let marker1 = new mapboxgl.Marker(currentMarkers);

                    currentMarkers.push(marker1);
                    marker1.setLngLat([longitude, latitude])
                        .addTo(map);
                }
                else if(rsp.data.length-1==k && c==0)
                {
                    alert("Please Enter Valid Mineral");
                    nodess=document.createElement('h3')
                    text=document.createTextNode("Nothing to show here");
                    nodess.appendChild(text);

                    info.appendChild(nodess);
                }
            })
        })
        console.log(c);
        console.log(k);
}

