var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);
}

  var makeRequest = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  }

  var requestComplete = function() {
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var songs = JSON.parse(jsonString);
    var albums = songs.albums.items;
    console.log(albums)
    populateList(albums);
  }

  var populateList = function(albums) {
    var div = document.getElementById('albums');

    albums.forEach(function(album) {
      
      var li = document.createElement('li');
      li.innerText = album.name;
      div.appendChild(li);

      var li = document.createElement('li');
      li.innerText = album.artists[0].name;
      div.appendChild(li);

      var img = document.createElement('img');
      img.src = album.images[1].url;
      div.appendChild(img)

      var link = document.createElement('a');
      link.innerText = "Take me to album";
      link.href = album.external_urls.spotify;
      div.appendChild(link);
    })
  }


window.onload = app;