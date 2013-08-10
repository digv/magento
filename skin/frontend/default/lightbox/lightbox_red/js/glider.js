
Glider = Class.create();
Object.extend(Object.extend(Glider.prototype, Abstract.prototype), {
	initialize: function(wrapper, options){
	    this.scrolling  = false;
	    this.wrapper    = $(wrapper);
	    this.scroller   = this.wrapper.down('div.scroller');
	    this.sections   = this.wrapper.getElementsBySelector('div.section');
	    this.options    = Object.extend({ controlsEvent:'click', duration: 1.0, frequency: 3 }, options || {});

	    this.sections.each( function(section, index) {
	      section._index = index;
	    });    

	    this.events = {
	      click: this.click.bind(this)
	    };

	    this.addObservers();
			if(this.options.initialSection) this.moveTo(this.options.initialSection, this.scroller, { duration:this.options.duration });  // initialSection should be the id of the section you want to show up on load
			if(this.options.autoGlide) this.start();
	  },
	
  addObservers: function() {
		this.controls = this.wrapper.getElementsBySelector('.controls a');
		this.controls.invoke('observe', this.options.controlsEvent, this.events.click);
  },	

  click: function(event) {
		this.stop();
    var element = Event.findElement(event, 'a');
    if (this.scrolling) this.scrolling.cancel();
    
		moveTo = this.wrapper.down('#'+element.href.split("#")[1])
    this.moveTo(moveTo, this.scroller, { duration:this.options.duration });     
    Event.stop(event);

		this.controls.each(function(control){
			if (control == element) {
				control.addClassName("active")
			}else{
				control.removeClassName("active")
			}			
		});
  },

	moveTo: function(element, container, options){
			this.current = $(element);

			Position.prepare();
	    var containerOffset = Position.cumulativeOffset(container),
	     elementOffset = Position.cumulativeOffset($(element));

		  this.scrolling 	= new Effect.SmoothScroll(container, 
				{duration:options.duration, x:(elementOffset[0]-containerOffset[0]), y:(elementOffset[1]-containerOffset[1])});
		  return false;
		},
		
  next: function(){
    if (this.current) {
      var currentIndex = this.current._index;
      var nextIndex = (this.sections.length - 1 == currentIndex) ? 0 : currentIndex + 1;      
    } else var nextIndex = 1;

    this.moveTo(this.sections[nextIndex], this.scroller, { 
      duration: this.options.duration
    });
  },
	
  previous: function(){
    if (this.current) {
      var currentIndex = this.current._index;
      var prevIndex = (currentIndex == 0) ? this.sections.length - 1 : 
       currentIndex - 1;
    } else var prevIndex = this.sections.length - 1;
    
    this.moveTo(this.sections[prevIndex], this.scroller, { 
      duration: this.options.duration
    });
  },

	stop: function()
	{
		clearTimeout(this.timer);
	},
	
	start: function()
	{
		this.periodicallyUpdate();
	},
		
	periodicallyUpdate: function()
	{ 
		if (this.timer != null) {
			clearTimeout(this.timer);
			this.next();
		}
		this.timer = setTimeout(this.periodicallyUpdate.bind(this), this.options.frequency*1000);
	}

});

Effect.SmoothScroll = Class.create();
Object.extend(Object.extend(Effect.SmoothScroll.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'absolute'
    } , arguments[1] || {}  );
    this.start(options);
  },
  setup: function() {
    if (this.options.continuous && !this.element._ext ) {
      this.element.cleanWhitespace();
      this.element._ext=true;
      this.element.appendChild(this.element.firstChild);
    }
   
    this.originalLeft=this.element.scrollLeft;
    this.originalTop=this.element.scrollTop;
   
    if(this.options.mode == 'absolute') {
      this.options.x -= this.originalLeft;
      this.options.y -= this.originalTop;
    } 
  },
  update: function(position) {   
    this.element.scrollLeft = this.options.x * position + this.originalLeft;
    this.element.scrollTop  = this.options.y * position + this.originalTop;
  }
});