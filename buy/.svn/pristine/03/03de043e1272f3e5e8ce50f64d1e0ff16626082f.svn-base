var $ = require("buy:widget/ui/jquery/jquery.js");

;(function( $, undefined ) {
		
	/*
	 * HoverDir object.
	 */
	$.HoverDir = function( options, element ) {
	
		this.$el = $( element );
		
		this._init( options );
		
	};
	
	$.HoverDir.defaults = {
		hoverDelay	: 0,
		reverse		: false
	};
	
	$.HoverDir.prototype = {
		_init : function( options ) {

			this.options = $.extend( true, {}, $.HoverDir.defaults, options );
			
			// load the events
			this._loadEvents();
			
		},
		_loadEvents	: function() {
			
			var _self = this;
			
			this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {
				
				var $el			= $(this),
					evType		= event.type,
					$hoverElem	= $el.find( 'div' ),
					direction	= _self._getDir( $el, { x : event.pageX, y : event.pageY } ),
					hoverClasses= _self._getClasses( direction );
				
				$hoverElem.removeClass();
				
				if( evType === 'mouseenter' ) {
					
					$hoverElem.hide().addClass( hoverClasses.from );
					
					clearTimeout( _self.tmhover );
					
					_self.tmhover	= setTimeout( function() {
						
						$hoverElem.show( 0, function() {
							$(this).addClass( 'da-animate' ).addClass( hoverClasses.to );
						} );
						
					
					}, _self.options.hoverDelay );
					
				}
				else {
				
					$hoverElem.addClass( 'da-animate' );
					
					clearTimeout( _self.tmhover );
					
					$hoverElem.addClass( hoverClasses.from );
					
				}
					
			} );
			
		},
		_getDir	: function( $el, coordinates ) {
			
				/** 当前div的宽高 **/				
				/** 计算x轴和y轴的距离. **/
				/** 并且将鼠标滑动过来的方向返回. **/
			var w = $el.width(),
				h = $el.height(),				
				x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
				y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),

				direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;
			
			return direction;
			
		},
		_getClasses	: function( direction ) {
			
			var fromClass, toClass;
			
			if(direction == 0){
				( !this.options.reverse ) ? fromClass = 'da-slideFromTop' : fromClass = 'da-slideFromBottom';
				toClass	= 'da-slideTop';
			}
			else if(direction == 1){
				( !this.options.reverse ) ? fromClass = 'da-slideFromRight' : fromClass = 'da-slideFromLeft';
				toClass	= 'da-slideLeft';
			}
			else if( direction == 2){
				( !this.options.reverse ) ? fromClass = 'da-slideFromBottom' : fromClass = 'da-slideFromTop';
				toClass	= 'da-slideTop';
			}
			else if(direction == 3){
				( !this.options.reverse ) ? fromClass = 'da-slideFromLeft' : fromClass = 'da-slideFromRight';
				toClass	= 'da-slideLeft';
			}

			return { from : fromClass, to: toClass };
					
		}
	};
	
	$.fn.hoverdir = function( options ) {
		/*if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'hoverdir' );
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {*/
		
		this.each(function() {
		
			var instance = $.data( this, 'hoverdir' );
			if ( !instance ) {
				$.data( this, 'hoverdir', new $.HoverDir( options, this ) );
			}
		});
		
		/*}*/
		
		return this;
		
	};
	
})( jQuery );