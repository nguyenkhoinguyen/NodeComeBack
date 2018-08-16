function Event(){
    this.Event={};
    this.Name = "Nguyen khoi nguyen";
}
Event.prototype.on = function(type,listen){
    this.Event[type] = this.Event[type] || [];
    this.Event[type].push(listen);
}
Event.prototype.emit = function(type){
    if(this.Event[type]){
        this.Event[type].forEach(a => {
            a();
        });
    }
}
module.exports = Event;