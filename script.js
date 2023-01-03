let map;


function initMap(coordinates = { lat: 31.9539, lng: 35.9106 }) {

    map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: 8,
  });
}


function search()
{

showLoader();
let query = document.getElementById("searchBox").value; 

if (query)
{ let request = new XMLHttpRequest(); // new object
      request.open("GET", "http://api.positionstack.com/v1/forward?access_key=82eb64b9129547181c780c53891dbe52&query="+query); // open is method
    
      request.send();
      request.onload = () => { //lamda fun() 
        
        if (request.status === 200) {
          let locationInfo = JSON.parse(request.response).data;
        
        if(locationInfo.length>0)
        {
        let location= locationInfo[0]; // to take the first object
          let payload= { lat: location.latitude, lng: location.longitude};
          initMap(payload);
          hideLoader();
          
        }
        else
        {
          alert("No results found");
          hideLoader();
        }

          
        } else {
          alert("Opps!! something went wrong!");
          hideLoader();
        }
      };

}
}

function showLoader()
{
  document.getElementById("spinner").style.display = "block";
  document.getElementById("main").style.display = "none";
}



function hideLoader()
{
  document.getElementById("spinner").style.display = "none";
  document.getElementById("main").style.display = "block";
}