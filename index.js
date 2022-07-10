let search = document.getElementById('searchmineral');
let btn = document.getElementById('btn');

var currentMarkers = [];




btn.addEventListener('click', () => {

    let search = document.getElementById('searchmineral');


    // remove markers 
    if (currentMarkers !== null) {
        for (var i = currentMarkers.length - 1; i >= 0; i--) {
            currentMarkers[i].remove();
        }
    }
    updateMap();


})
function updateMap() {

    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {


            // Mark on the map
            let marker1 = new mapboxgl.Marker(currentMarkers);

            let c = 0;
            let k = 0;
            for (let j = 0; j < rsp.data.length; j++) {
                if (rsp.data[j].Mineral.toUpperCase() == search.value.toUpperCase()) {
                    k++

                    latitude = rsp.data[j].Latitude;
                    longitude = rsp.data[j].Longitude;
                    currentMarkers.push(marker1);
                    marker1.setLngLat([longitude, latitude]).addTo(map);
                    console.log(rsp.data[j]);
                    c++;
                    continue;


                }
                else if (j == rsp.data.length - 1 && rsp.data[j].Mineral != search.value && c == 0) {


                    alert("Please enter valid mineral name")
                }
                else {
                    continue;
                }




                search.value = null;
            }
            console.log(currentMarkers);
        })
}
