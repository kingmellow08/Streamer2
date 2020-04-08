window.streamer = {tvs:{}, movies:{}};
$(document).ready(function(){

    $(document).on("click",".media-box.tvshow", function(){
        var id = $(this).attr("data-media");
        if(id)getTvshow(id);
    });
    $(document).on("click",".media-box.movie", function(){
        var id = $(this).attr("data-media");
        if(id)getMovie(id);
    });

    $(document).on("click","#view-movie  .watch-trailer", function(){
        var id = $(this).attr("data-youtube");
        var iframe = document.createElement('iframe');
        iframe.id="trailer";
        iframe.setAttribute("frameborder",0);
        iframe.setAttribute("allowfullscreen", "allowfullscreen");
        iframe.src = "https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=0&autohide=1&mute=0&showinfo=0&controls=1&autoplay=1&fs=1";

        $("#player-modal .content-box").html(iframe);
        $("#player-modal").modal("show");
    });

    $(document).on("click","#player-modal .close.modal-close-btn", function(){
        $("#player-modal .content-box").html('');
        $("#player-modal").modal("hide")
    });

    $(document).on("click",".casts .cast", function(){
        var id = $(this).attr("data-cast");
        if(id)getCast(id);
    });


});

function buildCast(casts){
    var html = '';
    casts.forEach(function(cast){
        var bg = '';
        if(cast.profile_path){
            bg = 'style="background-image:url(https://image.tmdb.org/t/p/w500/'+cast.profile_path+');background-size: cover;"';
        }else{
          bg = 'style="background-image:url(/static/images/placeholder.png);background-size: cover;"';
        }

        html += '<div class="cast" data-cast="'+cast.id+'" '+bg+'>';
        html += '<div class="cast-profile-img" title="'+cast.name+'"></div>';
        html += '<label class="text-center">'+cast.name+'</label>';
        html += '</div>';
    });
    return html;
}

function buildMedia(nodes , clas){
    var html = '';
    nodes.forEach(function(media){
        var bg = '';
        if(media.poster_path){
            bg = 'style="background-image:url(https://image.tmdb.org/t/p/w500/'+media.poster_path+');background-size: cover;"';
        }else{
          bg = 'style="background-image:url(/static/images/placeholder.png);background-size: cover;"';
        }

        html += '<a class="media-box '+clas+'" data-media="'+media.id+'" '+bg+'>';
        html += '<span  class="favorite"><i class="fas fa-heart"></i></span>';
        html += '<div class="overlay"></div>';
        html += '<label class="text-center">';

        if(clas == "movie"){

            html += '<div>'+media.title+'</div>';
            if(media.release_date){
                var d = new Date(media.release_date);
                var year  = d.getFullYear();
                html +=  '<div>'+year+'</div>';
            }

        }else{
            html += '<div>'+media.name+'</div>';
        }
        html += '</label>'
        html += '</a>';
    });
    return html;
}

function getTvshows(){
    var params = {};
    if(window.streamer && window.streamer.tvshows && window.streamer.tvshows.page){
        if(window.streamer.tvshows.page < window.streamer.tvshows.pages){
            params.page = window.streamer.tvshows.page + 1;
        }
    }
    fetchMedia("/", params, function(data){
        var html = buildMedia(data,'tvshow');

        $("#app-stage").html(html);
    });
}

function getTvshow(tv_id){
    $("#view-tvshow .details .status").html("");
    $("#view-tvshow .details .year").html("");
    $("#view-tvshow .poster img").attr('src','/static/images/placeholder.png');
    $("#view-tvshow .poster img").attr('alt', '');

    fetchMedia("/"+tv_id, {}, function(data){
      $("#view-tvshow .details .title").text(data.name);
      $("#view-tvshow .details .description p").text(data.overview);

      if(data.poster_path){
        $("#view-tvshow .poster img").attr('src','https://image.tmdb.org/t/p/w500/'+data.poster_path);
      }
      $("#view-tvshow .poster img").attr('alt', data.name);

      if(data.genres && data.genres.length > 0){
          var genres = '';
          data.genres.forEach(function(genre){
              genres += '<span class="badge badge-dark">'+genre.name+'</span>&nbsp;';
          });
          $("#view-tvshow .details .genres").html(genres);
      }

      if(data.status){
        $("#view-tvshow .details .status").html("<span>Status: "+data.status+"</span>");
      }

      if(data.type){
        $("#view-tvshow .details .type").html("<span>Type: "+data.type+"</span>");
      }

      if(data.first_air_date){
        var d = new Date(data.first_air_date);
        var year  = d.getFullYear();
        $("#view-tvshow .details .year").html("<span>First Aired:</span> "+year);
      }
      var seasons = '';
      if(data.seasons){
        var name = data.name.trim().toLowerCase().replace(/'/g,"").replace(/ /g,"_");
        data.seasons.forEach(function(season){
          var lab = "_"+season.name.trim().toLowerCase().replace(/ /g,"_");
          var ele_id =  name+lab;
          seasons += "<div class='season' aria-controls='"+ele_id+"' data-toggle='pill' role='tab'>"+season.name+"</div>";
          getEpisodes(tv_id, season.id, ele_id);
        });
      }
      $("#view-tvshow .seasons .wrapper").html(seasons);

      $("#view-tvshow").modal("show");
    });
}

function getEpisodes(tv_id,season_id,ele){
  var params = {tv_id:tv_id,}
  fetchMedia("/movies/", params, function(data){
      var html = "";
      var detail = "";
      data.episodes.forEach(function(episode){
        html += ""
      });

  });
}

function getMovies(){
    var params = {};
    if(window.streamer.movies.page){
        if(window.streamer.movies.page < window.streamer.movies.pages){
            params.page = window.streamer.movies.page + 1;
        }
    }
    fetchMedia("/movies/", params, function(data){
        var html = buildMedia(data,'movie');
        if(data.page){
            window.streamer.movies.page = data.page;
            window.streamer.movies.pages = data.total_page;
        }
        if(data.page == 1){
            $("#app-stage").html(html);
        }else{
            $("#app-stage").append(html);
        }

    })
}

function getMovie(id){
    $("#view-movie .details .status").html("");
    $("#view-movie .details .year").html("");
    $("#view-movie .poster img").attr('src','/static/images/placeholder.png');
    $("#view-movie .poster img").attr('alt', '');

    fetchMedia("/movies/"+id, {}, function(data){

        $("#view-movie .details .title").text(data.title);
        $("#view-movie .details .description p").text(data.overview);

        if(data.poster_path){
          $("#view-movie .poster img").attr('src','https://image.tmdb.org/t/p/w500/'+data.poster_path);
        }
        $("#view-movie .poster img").attr('alt', data.title);

        if(data.credits && data.credits.cast && data.credits.cast.length > 0){
            var casts = buildCast(data.credits.cast);
            $("#view-movie .details .casts").html(casts);
        }
        //get and set trailer
        if(data.videos && data.videos.results && data.videos.results.length > 0){
            var credits = '';
            for(var i = 0; i< data.videos.results.length;i++){
                if(data.videos.results[i].type.toLowerCase() == "trailer"){
                    $("#view-movie .watch-trailer").attr("data-youtube",data.videos.results[i].key);
                    break;
                }
            }
        }

        if(data.genres && data.genres.length > 0){
            var genres = '';
            data.genres.forEach(function(genre){
                genres += '<span class="badge badge-dark">'+genre.name+'</span>&nbsp;';
            });
            $("#view-movie .details .genres").html(genres);
        }

        if(data.status){
          $("#view-movie .details .status").html("<span>Status: "+data.status+"</span>");
        }

        if(data.release_date){
          var d = new Date(data.release_date);
          var year  = d.getFullYear();
          $("#view-movie .details .year").html("<strong>"+year+"</strong>");
        }

        $("#view-cast").modal('hide');
        $("#view-movie").modal("show");
    });
}


function getCast(id){
  //clear the data for the new data
  $("#view-cast .cast-name").text('');
  $("#view-cast .cast-biography").text('');
  $("#view-cast .cast-detail .profile-image").attr("src",'/static/images/placeholder.png');
  $("#view-cast .cast-gender").text('');
  $("#view-cast .cast-place-of-birth").text('');
  $("#view-cast .cast-role").text('');
  $("#view-cast .cast-tvshows").html ('');
  $("#view-cast .cast-movies").html('');

  fetchMedia("/cast/"+id, {}, function(cast){
        $("#view-cast .cast-name").text(cast.name);
        $("#view-cast .cast-biography").text(cast.biography);

        var gender = getGender(cast.gender);
        var tvshows = buildMedia(cast.tv_credits.cast,'tvshow');
        var movies = buildMedia(cast.movie_credits.cast,'movie');

        if(cast.profile_path){
            $("#view-cast .cast-detail .profile-image").attr("src",'https://image.tmdb.org/t/p/w500'+cast.profile_path);
        }

        $("#view-cast .cast-gender").text(gender);
        $("#view-cast .cast-place-of-birth").text(cast.place_of_birth);
        $("#view-cast .cast-role").text(cast.known_for_department);
        $("#view-cast .cast-tvshows").html (tvshows);
        $("#view-cast .cast-movies").html(movies);
        $("#view-cast").modal('show');
    })
}

function getGender(str){
    if(str == 1){
        return "Female";
    }

    if(str == 2){
        return "Male";
    }

}

function fetchMedia(url, params, callback){
    $("#loader-box").show();
    params.genre = $("select#genre").val();
    params.sort = $("select#sort").val();
    params.csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
    $.ajax({
        url:url,
        type:"POST",
        data:params,
        dataType:"json",
        success: function(data){
            if(data ){
                if(data.results && data.results.length > 0){

                    callback(data.results);
                }else{
                    callback(data);//for individual request
                }
            }
            $("#loader-box").hide();
        },
        error:function(){
            $("#loader-box").hide();
        }
    });
}
