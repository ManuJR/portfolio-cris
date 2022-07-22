
$(document).ready(function(){


    zoomOut("#zoomout_1",true, "appear")
    zoomOut("#zoomout_2",true, "appear")

    stepsScroll( "#stepsscroll_1" )

   
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
    let distElement = $(id_elem).offset().top;
    $(window).scroll(function(){
        let scroll = $(window).scrollTop();
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


function stepsScroll(id){
    let elem = $(id);
    let order = 0;
    if( elem.length !=1 ){
        return;
    }
    let distElement = $(id).offset().top;
    $(window).bind('mousewheel', function(e){
        let scroll = $(window).scrollTop();
        let windowWidth = $(window).width();
        let windowHeight = $(window).width();
        let scrollElement = scroll - distElement;
        console.log(scroll);
        console.log(distElement);
        
        if( scrollElement >= 0 && scrollElement <= windowHeight){
            // $(window).scroll().disable();
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log('scrolling up !');
                console.log(order--);
                
            }
            else{
                console.log(order++);
                console.log('scrolling down !');
            }
        }
    });

}