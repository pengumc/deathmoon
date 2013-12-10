/*coookie.js*/
function set_highscore(score){
    var expiration = new Date();
    expiration.setDate(expiration.getDate() + 10);
    document.cookie = "deathmoon_highscore=" + score + ";expires="
                      + expiration.toUTCString();
    
}

function get_highscore_from_cookie(){
    return(getFromCookie("deathmoon_highscore"));
}

function getFromCookie(something){
    var name_value_pair = document.cookie.split(";");
    var name;
    for(var i=0, pair;pair = name_value_pair[i];i++){
        name = pair.substr(0,pair.indexOf("=") );
        if (name.match(something)) {
            return(pair.substr(pair.indexOf("=")+1)); 
        }
    }
    return("");
    
}