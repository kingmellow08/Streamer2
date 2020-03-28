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
});


function buildHtml(nodes , clas){
    var html = '';
    nodes.forEach(function(media){
        html += '<a class="media-box '+clas+'" href="#" data-media="'+media.id+'" style="background-image:url(https://image.tmdb.org/t/p/w500/'+media.poster_path+');background-size: contain;">';
        html += '<span  class="favorite"><i class="fas fa-heart"></i></span>';
        html += '<div class="overlay"></div>';
        html += '<label class="text-center">';
        html += '<div>'+media.name+'</div>';
        if(clas == "movie"){
            html +=  '<div>2020</div>';
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
        $("#view-modal").modal("show");
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
        $("#view-modal").modal("show");
    });
}

function fetchMedia(url, params, callback){
    params.genre = $("select#genre").val();
    params.sort = $("select#sort").val();
    params.csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
    $.ajax({
        url:url,
        type:"POST",
        data:params,
        dataType:"json",
        success: function(data){
            if(data && data.results && data.results.length > 0){
                if(data.page){window.streamer.page = data.page;window.streamer.pages = data.total_page;}
                callback(data.results);
            }
        },
        error:function(){

        }
    });
}

