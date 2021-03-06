/**
 *	Loupe sur image sous le curseur. Permet de rajouter un carre qui represente
 *	la zone survolee agrandie d'un certain facteur
 *	@author	Amirouche HALFAOUI
 *	@date	2012.06.04
 *	
 *	@param	id		Identifiant de l'image a laquelle la loupe est affectee
 *	@param 	zoom	Facteur d'agrandissement de la loupe
 *	@param	size	Taille en pixels que doit prendre la loupe en hauteur et largeur
 */
function MagnifyingGlass(id, zoom, size){
		
		/** Element auquel ajouter la loupe */
		var _id = id;
		
		/** Reference vers l'image a laquelle est attachee la loupe */
		var _image = document.getElementById(_id);
		
		/** Facteur de zoom voulu */
		var _zoom = zoom;
		
		/** Dimensions de la loupe */
		var _size = size;
		
		var _area = "";
		
		var _areaimg ="";
		
		/** Ajout d'evenements a un objet (Multiplateforme) */
		addEvent = function(element, event, func) {
			if (element.addEventListener)
				element.addEventListener(event, func, false);
			else 
				element.attachEvent('on' + event, func);
		}
		
		/** Calcule la position d'un element par rapport a la gauche de l'ecran */
		calculateOffsetLeft = function(element){
			return calculateOffset(element,"offsetLeft")
		}
		
		/** Calcule la position d'un element par rapport au haut de l'ecran */		
		calculateOffsetTop = function(element){
			return calculateOffset(element,"offsetTop")
		}
		 
		/** Calcul de la position d'une image */
		calculateOffset = function(element,attr){
			var offset=0;
			while(element){
				offset+=element[attr];
				element=element.offsetParent
			}
			return offset;
		}
		
		/** 
		 * Creation de la zone qui sert de loupe 
		 * @param name	Nom a donner a la zone
		 */
		createMagnifyingArea = function(name){
			
			// Loupe en elle-meme (DIV conteneur)
			_area = document.createElement("div");
			_area.id 				= name;
			_area.style.width 		= _size + "px";
			_area.style.height 		= _size + "px";
			_area.style.position 	= "absolute";
			_area.style.display		= "none";
			_area.style.overflow 	= "hidden";
			
			// Image interne (plus grande que l'originale avec le facteur indique)
			_areaimg = document.createElement("img");
			_areaimg.id 			= name + "img";
			_areaimg.src 			= _image.src;
			
			// Des que l'image est chargee, on lui donne la bonne taille
			_areaimg.onload 		= function(){
				_areaimg.style.width	= _image.width*_zoom;
				_areaimg.style.height	= _image.height*_zoom;
			}
			_areaimg.style.position	= "absolute";
			
			// On ajoute le tout a la page
			_area.appendChild(_areaimg); 
			document.body.appendChild(_area);
		}
		
		/** Fonction qui reagit lors du mouvement de la souris sur l'image */
		handleMouseMove = function(event){
			
			// Recuperation de la position du curseur
			var x, y;
			var ie = false; /*@cc_on ie = true; @*/
			if (ie) {
				x=event.x+document.body.scrollLeft;
				y=event.y+document.body.scrollTop;
			} else {
				x=event.pageX;
				y=event.pageY;
			}
			
			// On affiche la loupe
			_area.style.display = "block";
			
			// Position du curseur sur l'image
			xPos = x - calculateOffsetLeft(_image);
			yPos = y - calculateOffsetTop(_image);
			
			// On met a jour uniquement si le curseur est sur l'image
			if(	xPos >= 0 && yPos >= 0 
					&& xPos <= _image.width && yPos <= _image.height){
				_area.style.left 		= x - (_size/2) + "px";
				_area.style.top 		= y - (_size/2) + "px";
				_areaimg.style.left 	= (-(xPos)*_zoom)+(_size/2) + "px";
				_areaimg.style.top 		= (-(yPos)*_zoom)+(_size/2) + "px";
			} else {
				// Sinon, on cache la loupe
				_area.style.display = "none";
			}
		};
		
		/**
		 * Permet de modifier l'agrandissement de la loupe
		 * @param zoom Nouveau facteur d'agrandissement voulu
		 */
		this.setZoom = function(zoom){
			_zoom = zoom;
			_areaimg.style.width	= _image.width*_zoom;
			_areaimg.style.height	= _image.height*_zoom;
		}
		
		/*** Partie constructeur **/
		// Creation de la zone
		createMagnifyingArea("ma" + _id);
		
		// Ajout des evenements
		addEvent(_image, "mouseover", handleMouseMove);
		addEvent(_area, "mousemove", handleMouseMove);
		
		
	};