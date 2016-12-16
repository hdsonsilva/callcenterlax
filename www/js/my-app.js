function atualizahoralast(){
	var hora = new Date();
	$$('.horalast').html();
}

function initparametros(){
	$$('#__user__').val(localStorage.getItem('__user__'));
	$$('#__passwd__').val(localStorage.getItem('__passwd__'));
	$$('#__url__').val(localStorage.getItem('__url__'));
}


function updateview1(){
	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val()
		},
		function(jsonn){
			
			$$('#numagentes').html("<span class='badge bg-red'>"+jsonn.AgentesAtivos+"</span>");
			$$('#numcampanhas').html("<span class='badge bg-red'>"+jsonn.CampanhasAtivas+"</span>");
			atualizahoralast()
		}
	);

	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/ligacoes.php',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val()
		},
		function(jsonn){
			$$('#listadiscadora').html("");
			$$('#listachamadas').html("");
			$$('#listadiscadora').html($$('#listadiscadora').html()+"<li><div class='item-content'><div class='item-inner'> <div class='item-title itemtitleperson'><div class='alinhamentoesquerda'>Tronco de Saida</div><div class='alinhamentodireita'>Nº Discado</div></div></div></div></li>");
			$$('#listachamadas').html($$('#listachamadas').html()+"<li><div class='item-content'><div class='item-inner'> <div class='item-title itemtitleperson'><div class='alinhamentoesquerda'>Operador</div><div class='alinhamentodireita'>Nº Contato</div></div></div></div></li>");
			$$.each(jsonn.Discadora, function(index, value){ 

			     $$('#listadiscadora').html($$('#listadiscadora').html()+"<li><div class='item-content'><div class='item-inner'> <div class='item-title itemtitleperson'><div class='alinhamentoesquerda'><i class='f7-icons'>search_strong</i> "+value.trunk + "</div><div class='alinhamentodireita'><i class='f7-icons'>phone</i> "+value.phone+"</div></div></div></div></li>");
			  });
			$$.each(jsonn.Agentes, function(index, value){ 
				$$('#listachamadas').html($$('#listachamadas').html()+"<li><div class='item-content'><div class='item-inner'> <div class='item-title  itemtitleperson'><div class='alinhamentoesquerda'><i class='f7-icons'>person_fill</i> "+value.nomeagente + "</div><div class='alinhamentodireita'><i class='f7-icons'>phone_fill</i> "+value.phone+"</div></div></div></div></li>");     
			  });
		}
	);
	/*Buscando resumo das chamadas do dia 

	Sucesso Success
	Falhas Failure
	Nao atendidas NoAnswer
	Curtas ShortCall
	*/
	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val(),
			'status'	:'Success'
		},
		function(jsonn){
			$$('#chamadastotalsucesso').html(jsonn.length+'<br>Sucesso');
			
		}
	);
	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val(),
			'status'	:'NoAnswer'
		},
		function(jsonn){
			var total = parseInt(jsonn.length);

			$$.getJSON(
				'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
				{	
					'__user__'	:$$('#__user__').val(),
					'__passwd__':$$('#__passwd__').val(),
					'status'	:'Abandoned'
				},
				function(jsonn){
					total = total + parseInt(jsonn.length);

					$$('#chamadastotalnaoatendidas').html(total+'<br>Perdidas');
					
				}
			);
			
		}
	);

	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val(),
			'status'	:'ShortCall'
		},
		function(jsonn){
			$$('#chamadastotalcurtas').html(jsonn.length+'<br>Curtas');
			
		}
	);

	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val(),
			'status'	:'Failure'
		},
		function(jsonn){
			$$('#chamadastotalfalhas').html(jsonn.length+'<br>Falhas');
			
		}
	);
	
}
//Função que verifica se as configurações foram setadas
function getConfig(){
	if(!localStorage.getItem('__user__') || !localStorage.getItem('__passwd__') || !localStorage.getItem('__url__')){
		return 0;
	}
	return 1;
}

// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

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
myApp.showTab('#view-2');
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

//Preenchendo os campos de conexão com o servidor se existirem
$$('#view-4').on('show' , function(e){

	$$('#__user__').val(localStorage.getItem('__user__'));
	$$('#__passwd__').val(localStorage.getItem('__passwd__'));
	$$('#__url__').val(localStorage.getItem('__url__'));

});

//Buscando campanhas do sistema
$$('#link-campanha').click(function(){

	
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
/*
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    // Code for About page

    if (page.name === 'about') {
    	alert('Iniciando pagina');
    }
    
});*/