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
	window.setInterval(updateview1,5000);

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
				$$('#listadetalhes').html("<div class='list-block'><ul>");
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     $$('#listadetalhes').html($$('#listadetalhes').html()+ "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>");
				     i++;
				});	
				//$$('#listadetalhes').html($$('#listadetalhes').html() + "</ul></div>");
		
			}
		);

	});
	//Exibindo analitico de chamadas curtas
	$$('#chamadastotalcurtas').on('click' , function(e){
		var i = 1 ;
		var j ;
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
				$$('#listadetalhes').html("<ul>");
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     $$('#listadetalhes').html($$('#listadetalhes').html()+ "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | "+ value.phone +" </div></div></div></li>");
				     i++;
				});	
				$$('#listadetalhes').html($$('#listadetalhes').html() + "</ul>");
		
			}
		);

	});
	//Exibindo analitico de chamadas falhas
	$$('#chamadastotalfalhas').on('click' , function(e){
		var i = 1 ;
		var j ;
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
				$$('#listadetalhes').html("<ul>");
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     $$('#listadetalhes').html($$('#listadetalhes').html()+ "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>");
				     i++;
				});	
				$$('#listadetalhes').html($$('#listadetalhes').html() + "</ul>");
		
			}
		);

	});
	//Exibindo analitico de chamadas perdidas
	$$('#chamadastotalnaoatendidas').on('click' , function(e){
		var i = 1 ;
		var j ;
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
				$$('#titulodetalhe').html("Chamadas com Falhas");
				$$('#listadetalhes').html("<div class='list-block'><ul>");
				$$.each(jsonn, function(index, value){ 
					 j = '0000' + i ;
					 j = j.substring((j.length-1)-3);
				     $$('#listadetalhes').html($$('#listadetalhes').html()+ "<li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li>");
				     i++;
				});
				$$.getJSON(
					'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
					{	
						'__user__'	:$$('#__user__').val(),
						'__passwd__':$$('#__passwd__').val(),
						'status'	:'Success',
						'campanha'	: $$('#__campanha__').val()
					},
					function(jsonn){
						$$.each(jsonn, function(index, value){ 
							 j = '0000' + i ;
							 j = j.substring((j.length-1)-3);
						     $$('#listadetalhes').html($$('#listadetalhes').html()+ "<div class='list-block'><li><div class='item-content'><div class='item-inner'><div class='item-title item-hudson'> "+ j + " | " + value.nomeagente + " | " + value.iniciochamada + " | " + value.phone +" </div></div></div></li></div>");
						     i++;
						});
						$$('#listadetalhes').html($$('#listadetalhes').html() + "</ul></div>");
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
	 	localStorage.setItem('__campanha__',$$(this).val());
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
	var push = PushNotification.init({
	  "android": {"senderID": "XXXXXX", icon : "icon"},
	  "ios": {"alert": "true", "badge": "true", "sound": "true"},
	  "windows": {}
	});

	// veja a explicação seguir
	push.on('registration', function(data) {
	   alert(data.registrationId);
	});

	// O que fazer quando clicar em uma notificação
	push.on('notification', function(data) {
	  alert('Notificação acionada, agora deve-se implementar a navegação no app de acordo com os dados: ' + JSON.stringify(data));
	});

	// erro caso não possa registrar (veja a explicação seguir)
	push.on('error', function(e) {
	  alert('registration error: ' + e.message);
	});


});
/*
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    // Code for About page

    if (page.name === 'about') {
    	alert('Iniciando pagina');
    }
    
});*/