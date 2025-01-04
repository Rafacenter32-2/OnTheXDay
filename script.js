//@ts-check
$(()=>{
    let time = new Date()
    let year = time.getFullYear()
    $(".year").html(year.toString())
    $(".day").html(daysIntoYear(time).toString())
    $("title").html("on the x day of "+year)
    function daysIntoYear(date){
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }
    console.log(daysIntoYear(time))

    const canvas = $("#puffs")[0]
    if (canvas instanceof HTMLCanvasElement) {
        const ctx = canvas.getContext("2d")
        if (ctx instanceof CanvasRenderingContext2D) {
            oncanvas(canvas,ctx,time)
        }else{
            console.error("no context (how did this happen)")
        }
    }else{
        console.error("no canvas")
    };
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} ctx 
     */
    function oncanvas(canvas, ctx, time) {
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        const puffy = new Image
        puffy.src = "mark.png"

        puffy.onload = ()=>{
            let oldpos = {
                x:0,y:0
            }
            for (let index = 0; index < (daysIntoYear(time) * 4); index++) {
                setTimeout(() => {   
                    ctx.drawImage(puffy,Math.random()*canvas.width- (puffy.width /2),Math.random()*canvas.height - (puffy.height /2))
                    $(".count").text((index + 1).toString())
                }, 10 * (index + 1));
            }
        }
    }
    
})
