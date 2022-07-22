
$(document).ready(function(){


    zoomOut("#zoomout_1",true, "appear")
    zoomOut("#zoomout_2",true, "appear")

   
})

function zoomOut(id_elem, elem_animate=false, class_animate=null){
    let elem = $(id_elem);
    if( elem.length !=1 ){
        return;
    }
    let initalScale = 2;
    let minimumScale = 0.75;
    let windowWidth = $(window).width();
    let windowHeight = $(window).width();

    if(windowWidth>1200){
        minimumScale = 0.65;
    }

    let offsetTopElem = $(id_elem+" #zoomout__scrollnext").offset().top;
    $(window).scroll(function(){
        let scroll = $(window).scrollTop();
        let distElement = $(id_elem).offset().top;
        let scrollElement = scroll - distElement;
        if( scroll >= distElement){
            let scalemax = initalScale - (scrollElement / 1000)
            if (scalemax < minimumScale) {
                scalemax = minimumScale
            }
            $(id_elem+" #zoomout__sticky").css({"transform": "scale("+scalemax+")"})
            if(!elem_animate){
                return;
            }
            if (scroll >= offsetTopElem - $(window).height() - 200) {
                $(id_elem +" .zoomout__img").addClass(class_animate)
            }else{
                $(id_elem +" .zoomout__img").removeClass(class_animate)
            }
        }
    })
}