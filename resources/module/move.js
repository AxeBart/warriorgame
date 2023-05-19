function onKey(type){
    window.addEventListener("keypress", (e)=>{
        console.log(e.key)
    })
}

export {
    onKey
}