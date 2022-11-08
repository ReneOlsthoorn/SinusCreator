
var app = window.app || {};

app.SinusCreator = (function() { 
    "use strict"; 
	
	function SinusCreator(container) {
		var aantalStappenTextBox,
			startWaardeTextBox,
			topWaardeTextBox,
			regelGrootteTextBox,
			sinusCanvas,
			sinusCanvasCtx,
			sinusCanvasWidth = 500,
			sinusCanvasHeight = 200,
			valuesDiv;
		
		function addDiv() {
			let newElement = $('<div class="my-div">hallo!</div>');
			$(container).append(newElement);
		}
		
		function newDivWithContent(content) {
			var newElement = document.createElement('div');
			newElement.innerHTML = content;
			container.appendChild(newElement);			
		}
		
		function clearSinusValues() {
			valuesDiv.empty();
		}
		
		function writeSinusValue(value) {
			value = Number((value).toFixed());
			let divIsEmpty = valuesDiv.is(':empty');
			let prefix = divIsEmpty ? "" : ", ";
			valuesDiv.append("<span>" + prefix + value.toString() +"</span>");
		}

		function sinPath(ctx) {
			var n  = parseInt(aantalStappenTextBox.val());
			var dx = 2 * (Math.PI) / n;
			var x  = 0;
			var y = 0;
			var px = 10;
			var py = 100;
			
			let startWaarde = parseInt(startWaardeTextBox.val());
			let topWaarde = parseInt(topWaardeTextBox.val());
			topWaarde = topWaarde - startWaarde;
			let regelGrootte = parseInt(regelGrootteTextBox.val());
			
			ctx.clearRect(0, 0, sinusCanvasWidth, sinusCanvasHeight);

			ctx.beginPath();
			ctx.moveTo(px, py);
		   
			for (let i = 0; i < n; i++) {
				y = Math.sin(x);
				
				let writeY = Number((y * topWaarde).toFixed());				
				writeSinusValue((startWaarde + writeY) * regelGrootte);

				px += (180.0/(Math.PI))*dx;
				py = 100 - 80*y;

				ctx.fillRect(px,py,3,3);
				//ctx.lineTo(px, py);
				x += dx;
			}

			ctx.stroke(); 
			ctx.closePath();
			
			ctx.fillText(startWaardeTextBox.val(), 20, 110);
			ctx.fillText(topWaardeTextBox.val(), 80, 15);
			ctx.fillText(startWaardeTextBox.val(), 200, 110);			
			ctx.fillText((startWaarde - topWaarde).toString(), 260, 200);
		}	
		
		function getFromSession() {
			if (sessionStorage.getItem('SinusCreatorAantalStappen')) {
				aantalStappenTextBox.val(sessionStorage.getItem('SinusCreatorAantalStappen'));
				startWaardeTextBox.val(sessionStorage.getItem('SinusCreatorStartWaarde'));
				topWaardeTextBox.val(sessionStorage.getItem('SinusCreatorTopWaarde'));
				regelGrootteTextBox.val(sessionStorage.getItem('SinusCreatorRegelGrootte'));
			}
		}

		function setInSession() {
			sessionStorage.setItem('SinusCreatorAantalStappen', aantalStappenTextBox.val());
			sessionStorage.setItem('SinusCreatorStartWaarde', startWaardeTextBox.val());
			sessionStorage.setItem('SinusCreatorTopWaarde', topWaardeTextBox.val());
			sessionStorage.setItem('SinusCreatorRegelGrootte', regelGrootteTextBox.val());
		}	
		
		function generateSinus() {
			clearSinusValues();
			sinPath(sinusCanvasCtx);
			
			setInSession();
		}
		
		function addScreenComponentsSinusCreator() {
			let theDiv = $('<div></div>');
			theDiv.append('<span>Aantal stappen: </span>');
			aantalStappenTextBox = $('<input type="text" value="30" />');			
			theDiv.append(aantalStappenTextBox);

			let startWaardeDiv = $('<div></div>');
			startWaardeDiv.append('<span>Startwaarde: </span>');
			startWaardeTextBox = $('<input type="text" value="0" />');			
			startWaardeDiv.append(startWaardeTextBox);

			let topWaardeDiv = $('<div></div>');
			topWaardeDiv.append('<span>Topwaarde: </span>');
			topWaardeTextBox = $('<input type="text" value="100" />');			
			topWaardeDiv.append(topWaardeTextBox);

			let regelGrootteDiv = $('<div></div>');
			regelGrootteDiv.append('<span>Regelgrootte: </span>');
			regelGrootteTextBox = $('<input type="text" value="1" />');			
			regelGrootteDiv.append(regelGrootteTextBox);
			
			let buttonDiv = $('<div></div>');
			let generateButton = $('<input type="button" value="Generate sinus" />');
			generateButton.on("click", generateSinus);
			buttonDiv.append(generateButton);
			
			let canvasDiv = $('<div></div>');
			sinusCanvas = $('<canvas id="myCanvas" width="500" height="200" />');
			canvasDiv.append(sinusCanvas);

			valuesDiv = $('<div></div>');
			
			$(container).append(theDiv);
			$(container).append(startWaardeDiv);
			$(container).append(topWaardeDiv);
			$(container).append(regelGrootteDiv);
			$(container).append(buttonDiv);
			$(container).append(canvasDiv);
			$(container).append(valuesDiv);
			
			sinusCanvasCtx = sinusCanvas[0].getContext('2d');
			sinusCanvasCtx.font = '18px sans-serif';
		}
		
		function setupSinusCreator() {
			addScreenComponentsSinusCreator();
			getFromSession();
		}
	
        function init() {
			setupSinusCreator();
        };

        init();
    };

	return SinusCreator;
})();
