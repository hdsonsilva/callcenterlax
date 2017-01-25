var myApp = new Framework7();

var controledetalhe = 0 ;
// Export selectors engine
var $$ = Dom7;

// Initialize your app
$$(document).on('DOMContentLoaded',function(){

	// Add views
	var view1 = myApp.addView('#view-1', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});
	var view2 = myApp.addView('#view-2');
	var view3 = myApp.addView('#view-3');
	var view4 = myApp.addView('#view-4');
	var view5 = myApp.addView('#view-5');

	
	//Verificando se as configurações existem no inicio da aplicação
	if(!getConfig()){
		alert('É necessário configurar o App');
		myApp.showTab('#view-4');
	}


	//Verificando se as configurações existem quando se alterar o menu
	$$('#view-1, #view-2, #view-3').on('show',function(){
		if(!getConfig()){
			alert('É necessário configurar o App');
			myApp.showTab('#view-4');
		}
	});

	//Setando visualizacao inicial do aplicativo
	myApp.showTab('#view-1');
	//Iniciando parametros de conexao
	initparametros();
	//Fazendo primeira busca dos dados no servidor
	updateview1();
	//Setando periodo de atualização dos dados para 5 segundos
	window.setInterval(updateview1,10000);

	//Preenchendo os dados da aba de resumo de campanhas
	$$('#view-1').on('show' , function(e){
		//window.setInterval(updateview1(),5000);
	});
	//Buscando campanhas para exibir quando o usuario selecionar o menu de campanhas
	$$('#click-hd-view-2').on('click' , function(e){
		
		//window.setInterval(updateview1(),5000);
		$$.getJSON(
			'http://' + $$('#__url__').val()+ '/elastixserver/',
			{	
				'__user__'	:$$('#__user__').val(),
				'__passwd__':$$('#__passwd__').val()
			},
			function(jsonn){
				$$('#titulodetalhe').html("Campanhas");
				$$('#listadetalhes').html("<ul>");
				$$.each(jsonn.Campanhas, function(index, value){ 
				     $$('#listadetalhes').html($$('#listadetalhes').html()+ "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+value.name+" </div></div></div></li>");
				});
				$$('#listadetalhes').html($$('#listadetalhes').html() + "</ul>");
		
			}
		);

	});

	$$('#click-hd-view-3').on('click' , function(e){
		$$('#titulodetalhe').html("Carregando ....");
		$$('#listadetalhes').html("");
		//window.setInterval(updateview1(),5000);
		$$.getJSON(
			'http://' + $$('#__url__').val()+ '/elastixserver/',
			{	
				'__user__'	:$$('#__user__').val(),
				'__passwd__':$$('#__passwd__').val()
			},
			function(jsonn){
				$$('#titulodetalhe').html("Agentes");
				$$('#listadetalhes').html("<ul>");
				$$.each(jsonn.Agentes, function(index, value){ 
				     $$('#listadetalhes').html($$('#listadetalhes').html()+ "<li><div class='item-content'><div class='item-inner'><div class='item-title'> "+value.number + ' - ' + value.name + ( value.id_break ? ' | Parada Solicitada' : '') +" </div></div></div></li>");
				});
				$$('#listadetalhes').html($$('#listadetalhes').html() + "</ul>");
		
			}
		);
	});
	//Exibindo analitico de chamadas com sucesso
	$$('#chamadastotalsucesso').on('click' , function(e){
		var i = 1 ;
		var j ;
		var controle = 0;
		var lista = '' ;
		$$('#titulodetalhe').html("Carregando ....");
		$$('#listadetalhes').html("");
		myApp.showTab('#view-5');
		//window.setInterval(updateview1(),5000);
		$$.getJSON(
			'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
			{	
				'__user__'	:$$('#__user__').val(),
				'__passwd__':$$('#__passwd__').val(),
				'status'	:'Success',
				'campanha'	: $$('#__campanha__').val()
			},
			function(jsonn){
				$$('#titulodetalhe').html("Chamadas com Sucesso");
				lista = "<div class='list-block'><ul>";
				controle = jsonn.length ;
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     lista = lista + "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>";
				     i++;
				});	
				while(i < controle);
				
				lista = lista + "</ul></div>";
				$$('#listadetalhes').html(lista);
			}
		);

	});
	//Exibindo analitico de chamadas curtas
	$$('#chamadastotalcurtas').on('click' , function(e){
		var i = 1 ;
		var j ;
		var lista = '';
		$$('#titulodetalhe').html("Carregando ....");
		$$('#listadetalhes').html("");
		myApp.showTab('#view-5');
		//window.setInterval(updateview1(),5000);
		$$.getJSON(
			'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
			{	
				'__user__'	:$$('#__user__').val(),
				'__passwd__':$$('#__passwd__').val(),
				'status'	:'ShortCall',
				'campanha'	: $$('#__campanha__').val()
			},
			function(jsonn){
				$$('#titulodetalhe').html("Chamadas Curtas");
				lista = "<div class='list-block'><ul>";
				controle = jsonn.length ;
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     lista = lista + "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>";
				     i++;
				});	
				while(i < controle);
				
				lista = lista + "</ul></div>";
				$$('#listadetalhes').html(lista);
			}
		);

	});
	//Exibindo analitico de chamadas falhas
	$$('#chamadastotalfalhas').on('click' , function(e){
		var i = 1 ;
		var j ;
		var lista = '';
		$$('#titulodetalhe').html("Carregando ....");
		$$('#listadetalhes').html("");
		myApp.showTab('#view-5');
		//window.setInterval(updateview1(),5000);
		$$.getJSON(
			'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
			{	
				'__user__'	:$$('#__user__').val(),
				'__passwd__':$$('#__passwd__').val(),
				'status'	:'Fail',
				'campanha'	: $$('#__campanha__').val()
			},
			function(jsonn){
				$$('#titulodetalhe').html("Chamadas com Falhas");
				lista = "<div class='list-block'><ul>";
				controle = jsonn.length ;
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     lista = lista + "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>";
				     i++;
				});	
				while(i < controle);
				
				lista = lista + "</ul></div>";
				$$('#listadetalhes').html(lista);
			}
		);

	});
	//Exibindo analitico de chamadas perdidas
	$$('#chamadastotalnaoatendidas').on('click' , function(e){
		var i = 1 ;
		var j ;
		var lista = '';
		$$('#titulodetalhe').html("Carregando ....");
		$$('#listadetalhes').html("");
		myApp.showTab('#view-5');
		//window.setInterval(updateview1(),5000);
		$$.getJSON(
			'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
			{	
				'__user__'	:$$('#__user__').val(),
				'__passwd__':$$('#__passwd__').val(),
				'status'	:'Abandoned',
				'campanha'	: $$('#__campanha__').val()
			},
			function(jsonn){
				$$('#titulodetalhe').html("Chamadas Perdidas");
				$$('#listadetalhes').html("<div class='list-block'><ul>");
				lista = "<div class='list-block'><ul>";
				controle = jsonn.length ;
				
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     lista = lista + "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>";
				     i++;
				});	
				while(i < controle);
				$$.getJSON(
					'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
					{	
						'__user__'	:$$('#__user__').val(),
						'__passwd__':$$('#__passwd__').val(),
						'status'	:'NoAnswer',
						'campanha'	: $$('#__campanha__').val()
					},
					function(jsonn){
						controle = jsonn.length ;
						$$.each(jsonn, function(index, value){ 
							 j = '0000' + i ;
							 j = j.substring((j.length-1)-3);
						     lista = lista + "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>";
						     i++;
						});	
						while(i < controle);
						lista = lista + "</ul></div>";
						$$('#listadetalhes').html(lista);
					}
				);	
				
		
			}
		);

	});
	
	//Cliques da aba Ligações
	$$('#totaldechamadas').click(function(){
		alert('Para detalhar, selecione os totais parciais');
	});

	//Preenchendo os campos de conexão com o servidor se existirem para exibir para o usuario os campos preenchidos
	$$('#view-4').on('show' , function(e){

		$$('#__user__').val(localStorage.getItem('__user__'));
		$$('#__passwd__').val(localStorage.getItem('__passwd__'));
		$$('#__url__').val(localStorage.getItem('__url__'));
		$$('#__campanha__').val(localStorage.getItem('__campanha__'));


	});
	$$('#view-2').on('show' , function(e){
		$$('#chamadastotalfalhas').html('<br>Aguarde...');
		$$('#chamadastotalcurtas').html('<br>Aguarde...');
		$$('#chamadastotalnaoatendidas').html('<br>Aguarde...');
		$$('#chamadastotalsucesso').html('<br>Aguarde...');
		$$('#totaldechamadas').html('<br>Aguarde...');
		$$('#__user__').val(localStorage.getItem('__user__'));
		$$('#__passwd__').val(localStorage.getItem('__passwd__'));
		$$('#__url__').val(localStorage.getItem('__url__'));
		$$('#__campanha__').val(localStorage.getItem('__campanha__'));


	});
	//Preenchendo lista de campanhas ativas na configuração 
	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val()
		},
		function(jsonn){
			 $$('#__campanha__').html("<option value=''>Todas</option>");
			$$.each(jsonn.Campanhas, function(index, value){ 
			     $$('#__campanha__').html($$('#__campanha__').html()+"<option value='"+value.id+"'>"+value.id +" | "+value.name+"</option>");
			});

	
		}
	);
	//Carregando id da campanha
	 $$('#__campanha__').change(function(){
	 	localStorage.setItem('__campanha__',$$('#__campanha__').val());
	 });

	//Salvando configurações de acesso ao servidor elastix
	$$('#salvarconfig').click(function(){
		$$.get(
			'http://' + $$('#__url__').val()+ '/elastixserver/autenticacao.php',
			{	
				'__user__'	:$$('#__user__').val(),
				'__passwd__':$$('#__passwd__').val()
			},
			function(valor){

				if( valor == '' ){
					localStorage.setItem('__user__', $$('#__user__').val());
					localStorage.setItem('__passwd__', $$('#__passwd__').val());
					localStorage.setItem('__url__', $$('#__url__').val());

					alert('Ok! Dados configurados com sucesso!');
				}
				else{
					alert('Erro! Credenciais inválidas!');	
				}
			},
			function(e){
				
				localStorage.setItem('__user__', $$('#__user__').val());
				localStorage.setItem('__passwd__', $$('#__passwd__').val());
				localStorage.setItem('__url__', $$('#__url__').val());
				alert('Erro na conexão.');
			}
		);
	});








 


	// Configura a notificação, altere o senderID
	/*
	var push = PushNotification.init({
	  "android": {"senderID": "182505207980", icon : "icon"},
	  "ios": {"alert": "true", "badge": "true", "sound": "true"},
	  "windows": {}
	});
	*/
	var pushNotification;
            
    function onDeviceReady() {
        //$("#app-status-ul").append('<li>Device ok. Evento ativado.</li>');
        alert('Device ok. Evento ativado');
        
		document.addEventListener("backbutton", function(e)
		{
        	//$("#app-status-ul").append('<li>backbutton clicado.</li>');
        	alert('backbutton clicado.');
				
				//if( $("#home").length > 0)
			if(1)
			{
				// call this to get a new token each time. don't call it to reuse existing token.
				//pushNotification.unregister(successHandler, errorHandler);
				e.preventDefault();
				navigator.app.exitApp();
			}
			else
			{
				navigator.app.backHistory();
			}
		}, false);
		alert('Registrando o ' + device.platform );
		try 
		{ 
			alert('Registrando o ' + device.platform );
        	pushNotification = window.plugins.pushNotification;
      		//$("#app-status-ul").append('<li>Registrando o ' + device.platform + '</li>');
      		$$("#loggg").append('<li>Registrando o ' + device.platform + '</li>');
      		alert('Registrando o ' + device.platform );
        	if (device.platform == 'android' || device.platform == 'Android' ||
                    device.platform == 'amazon-fireos' ) {
				pushNotification.register(successHandler, errorHandler, {"senderID":"182505207980","ecb":"onNotification"});		// required!
			} else {
            	pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
        	}
        }
		catch(err) 
		{ 
			txt="Um erro ocorreu.\n\n"; 
			txt+="Descrição do erro: " + err.message + "\n\n"; 
			$$("#loggg").append(txt);
			alert(txt); 
		} 
    }
    
    // handle APNS notifications for iOS
    function onNotificationAPN(e) {
        if (e.alert) {
             //$("#app-status-ul").append('<li>push-notificação: ' + e.alert + '</li>');
             alert('push-notificação: ' + e.alert);
             // showing an alert also requires the org.apache.cordova.dialogs plugin
             navigator.notification.alert(e.alert);
        }
            
        if (e.sound) {
            // playing a sound also requires the org.apache.cordova.media plugin
            var snd = new Media(e.sound);
            snd.play();
        }
        
        if (e.badge) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
    }
    
    // handle GCM notifications for Android
    function onNotification(e) {
        //$("#app-status-ul").append('<li>EVENTO -> RECEBIDO:' + e.event + '</li>');
        alert('EVENTO -> RECEBIDO:' + e.event );
        
        switch( e.event )
        {
            case 'registered':
			if ( e.regid.length > 0 )
			{
				//$("#app-status-ul").append('<li>REGISTRANDO -> REGID: \n\n' + e.regid + "\n\n</li>");
				alert('REGISTRANDO -> REGID: \n\n' + e.regid );
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.
				console.log("regID = " + e.regid);
			}
            break;
            
            case 'message':
            	// if this flag is set, this notification happened while we were in the foreground.
            	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
            	if (e.foreground)
            	{
					$("#app-status-ul").append('<li>--NOTIFICAÇÕES IN LINE--' + '</li>');
				      
				        // on Android soundname is outside the payload. 
			                // On Amazon FireOS all custom attributes are contained within payload
			                var soundfile = e.soundname || e.payload.sound;
			                // if the notification contains a soundname, play it.
			                // playing a sound also requires the org.apache.cordova.media plugin
			                var my_media = new Media("/android_asset/www/"+ soundfile);

					my_media.play();
				}
				else
				{	// otherwise we were launched because the user touched a notification in the notification tray.
					if (e.coldstart) ;
						//$("#app-status-ul").append('<li>--NOTIFICAÇÕES RECEBIDAS--' + '</li>');
					else ;
					//$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
				}
					
				//$("#app-status-ul").append('<li>MENSAGEM -> MSG: ' + e.payload.message + '</li>');
                //android only
				//$("#app-status-ul").append('<li>MENSAGEM -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                //amazon-fireos only
                //$("#app-status-ul").append('<li>MENSAGEM -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
            break;
            
            case 'error':
				//$("#app-status-ul").append('<li>ERRO -> MSG:' + e.msg + '</li>');
				alert('ERRO -> MSG:' + e.msg )
            break;
            
            default:
				//$("#app-status-ul").append('<li>EVENTO -> Unknown, an event was received and we do not know what it is</li>');
            break;
        }
    }
    
    function tokenHandler (result) {
        //$("#app-status-ul").append('<li>token: '+ result +'</li>');
        alert('token: '+ result );
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
    }
	
    function successHandler (result) {
        //$("#app-status-ul").append('<li>sucesso:'+ result +'</li>');
        alert('sucesso:'+ result);
    }
    
    function errorHandler (error) {
        //$("#app-status-ul").append('<li>erro:'+ error +'</li>');
        alert('erro:'+ error);
    }
    
	onDeviceReady();

});
