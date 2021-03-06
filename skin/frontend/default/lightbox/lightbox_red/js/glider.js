// Glider 
Glider = Class.create();
Object.extend(Object.extend(Glider.prototype, Abstract.prototype), {
	initialize: function(wrapper, options){
        this.handStopped = false;
	    this.scrolling  = false;
	    this.wrapper    = $(wrapper);
	    this.scroller   = this.wrapper.down('div.scroller');
	    this.sections   = this.wrapper.getElementsBySelector('div.sectionslide');
	    this.options    = Object.extend({ duration: 1.0, frequency: 3 }, options || {});

	    this.sections.each( function(section, index) {
	      section._index = index;
	    });    

	    this.events = {
	      click: this.click.bind(this),
          mouseover: this.pause.bind(this),
          mouseout: this.resume.bind(this)
	    };

	    this.addObservers();
        if(this.options.initialSection) {
        	$j ('div#' + this.options.initialSection + '.sectionslide').show ();
            this.moveTo(this.options.initialSection, this.scroller, { duration:this.options.duration });  // initialSection should be the id of the section you want to show up on load
            
        }
        if(this.options.autoGlide) 
            this.start();
	  },
	
  addObservers: function() {
    this.wrapper.observe('mouseover', this.events.mouseover);
    this.wrapper.observe('mouseout', this.events.mouseout);
    
    var descriptions = this.wrapper.getElementsBySelector('div.sliderdescription');
    descriptions.invoke('observe', 'mouseover', this.makeActive);
    descriptions.invoke('observe', 'mouseout', this.makeInactive);
    
    var controls = this.wrapper.getElementsBySelector('div.slidercontrol a');
    controls.invoke('observe', 'mouseover', this.events.click);

  },

  click: function(event) {
    var element = Event.findElement(event, 'a');
    
    if (this.scrolling) this.scrolling.cancel();
    this.moveTo(element.href.split("#")[1], this.scroller, { duration:this.options.duration });  
     if (!this.handStopped) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    Event.stop(event);
  },

  moveTo: function(element, container, options) {
	  
	  $j('div.sectionslide').hide ();
	  
	  if (typeof element !== 'object') {
		  $j ('div#' + element + '.sectionslide').show ('fade', 1500);
	  } else {
		  $j (element).show ('fade', 1500);
	  }
    this.current = $(element);
    Position.prepare();
    var containerOffset = Position.cumulativeOffset(container);
    var elementOffset = Position.cumulativeOffset(this.current);

    this.scrolling = new Effect.SmoothScroll(container, {
      duration:options.duration, 
      x:(elementOffset[0]-containerOffset[0]), 
      y:(elementOffset[1]-containerOffset[1])
    });
    
    if (typeof element == 'object')
        element = element.id;
        
    this.toggleControl($$('a[href="#'+element+'"]')[0]);
    
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
  
  makeActive: function(event)
  {
    var element = Event.findElement(event, 'div');
    element.addClassName('active');
  },
  
  makeInactive: function(event)
  {
    var element = Event.findElement(event, 'div');
    element.removeClassName('active');
  },
  
  toggleControl: function(el)
  {
    $$('.slidercontrol a').invoke('removeClassName', 'active');
    el.addClassName('active');
  },

	stop: function()
	{
        this.handStopped = true;
		clearTimeout(this.timer);
	},
	
	start: function()
	{
        this.handStopped = false;
		this.periodicallyUpdate();
	},
    
    pause: function()
    {
      if (!this.handStopped) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    
    resume: function()
    {
      if (!this.handStopped)
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

// End of Glider
