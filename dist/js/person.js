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