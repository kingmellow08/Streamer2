window.streamer = {};
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
        $("#player-modal").modal("hide");
    });
});


function buildHtml(nodes , clas){
    var html = '';
    nodes.forEach(function(media){
        html += '<a class="media-box '+clas+'" data-media="'+media.id+'" style="background-image:url(https://image.tmdb.org/t/p/w500/'+media.poster_path+');background-size: cover;">';
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
    fetchMedia("/", {}, function(data){
        var html = buildHtml(data,'tvshow');
        
        $("#app-stage").html(html);
    });
}

function getTvshow(id){
    fetchMedia("/"+id, {id:id}, function(data){
        $("#view-tvshow").modal("show");
    })
}

function getMovies(){
    fetchMedia("/movies/", {}, function(data){
        var html = buildHtml(data,'movie');
        
        $("#app-stage").html(html);
    })
}

function getMovie(id){
    fetchMedia("/movies/"+id, {id:id}, function(data){
        $("#view-movie .details .title").text(data.title);
        $("#view-movie .details .description p").text(data.overview);
        
        $("#view-movie .poster").html('<img src="https://image.tmdb.org/t/p/w500/'+data.poster_path+'" class="img-fluid" alt="'+data.title+'" />');
        if(data.credits && data.credits.length > 0){
            var credits = '';
            data.credits.forEach(function(){
                
            })
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
        $("#view-movie").modal("show");
    });
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
                    if(data.page){window.streamer.page = data.page;window.streamer.pages = data.total_page;}
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

