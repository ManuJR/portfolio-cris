
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



let animations = [
    "a-appear", "a-to-bottom"
]
function stepsScroll(id){
    let elem = $(id);
    let order = 0;
    let n_steps = 8;
    if( elem.length !=1 ){
        return;
    }
    let distElement = $(id).offset().top;
    $(window).bind('mousewheel', function(e){
        let scroll = $(window).scrollTop();
        let windowWidth = $(window).width();
        let windowHeight = $(window).width();
        let scrollElement = scroll - distElement;
        
        if( scrollElement >= 0 && scrollElement <= windowHeight){
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log('scrolling up !');
                removeStep(order, animations[order-1]);
                order = order>0 ? order-1 : 0;
                console.log(order);
                
            }
            else{
                console.log('scrolling down !');
                order = order<n_steps ? order+1 :n_steps;
                console.log(order);
                addStep(order, animations[order]);
    
                

            }
        }
    });
}

function addStep(n, a_class){
    $(".step_"+n).addClass(a_class);
}

function removeStep(n, a_class){
    $(".step_"+n).removeClass(a_class);
}