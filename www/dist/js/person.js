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
	var totalligacoes = 0 ;
	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val()
		},
		function(jsonn){
			
			$$('#numagentes').html("<span class='badge bg-red'>"+(jsonn.Agentes.length != undefined ? jsonn.Agentes.length : 0) +"</span>");
			$$('#numcampanhas').html("<span class='badge bg-red'>"+(jsonn.Campanhas.length != undefined ? jsonn.Campanhas.length : 0)+"</span>");

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
		
	//Chamadas Curtas
	$$.getJSON(
		'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
		{	
			'__user__'	:$$('#__user__').val(),
			'__passwd__':$$('#__passwd__').val(),
			'status'	:'ShortCall',
			'sintetico'	: '1'
		},
		function(jsonn){
			$$('#chamadastotalcurtas').html(jsonn.Total+'<br>Curtas');
			totalligacoes += parseInt(jsonn.Total);
			//Chamadas Falhas
			$$.getJSON(
				'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
				{	
					'__user__'	:$$('#__user__').val(),
					'__passwd__':$$('#__passwd__').val(),
					'status'	:'Failure',
					'sintetico'	: '1'
				},
				function(jsonn){
					$$('#chamadastotalfalhas').html(jsonn.Total+'<br>Falhas');
					totalligacoes += parseInt(jsonn.Total);
					//Chamadas nao respondidas
					$$.getJSON(
						'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
						{	
							'__user__'	:$$('#__user__').val(),
							'__passwd__':$$('#__passwd__').val(),
							'status'	:'NoAnswer',
							'sintetico'	: '1'
						},
						function(jsonn){
							var total = parseInt(jsonn.Total);

							$$.getJSON(
								'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
								{	
									'__user__'	:$$('#__user__').val(),
									'__passwd__':$$('#__passwd__').val(),
									'status'	:'Abandoned',
									'sintetico'	: '1'
								},
								function(jsonn){
									total = total + parseInt(jsonn.Total);
									totalligacoes += parseInt(total);
									$$('#chamadastotalnaoatendidas').html(total+'<br>Perdidas');
									//Chamadas com sucesso
									$$.getJSON(
											'http://' + $$('#__url__').val()+ '/elastixserver/chamadasdodia.php',
											{	
												'__user__'	:$$('#__user__').val(),
												'__passwd__':$$('#__passwd__').val(),
												'status'	:'Success',
												'sintetico'	: '1'
											},
											function(jsonn){
												$$('#chamadastotalsucesso').html(jsonn.Total+'<br>Sucesso');
												totalligacoes += parseInt(jsonn.Total);
												$$('#totaldechamadas').html(totalligacoes+'<br>Geral');
											}
										);
								}
							);
							
						}
					);

				}
			);
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