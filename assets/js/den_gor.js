obj_protocolos_densidade_gordura = [
    {
        name:'Jackson e Pullock, 1978',
        id:'Jackson-e-Pullock-1978',
        description:'<p>Homens 18 á 61 anos de idade, não atletas  <br>Dados: Dobras cutâneas de peito, abdomen e coxa <br>D= 1,1093800 - 0,0008267 x (x3) + 0,0000016 x (x3)² - 0,0002574 x (x4) <br>X3 = (Peito + abdomen + coxa) <br>X4 = IDADE <br></p>'
    },
    {
        name:'Sloan masculino',
        id:'Sloan-masculino',
        description:'<p>Média de idade dos participantes do estudo: 18 á 26 anos <br>dobras : coxa e subescapular<br>Dados: dobras coxa e Subescapular<br>D = 1,1043 - 0,001327 x (CX) - 0,001310 x (SE)</p>'
    },
    {
        name:'Sloan, Burt & Blyth feminíno',
        id:'Sloan-Burt-&-Blyth-feminino',
        description:'<p>Média de idade das participantes do estudo: 20 anos<br> Dados: dobras supra ilíaca e triciptal<br> D = 1,0764 - 0,00081 x (SI) - 0,00088 x (TR)<br></p>'
    },
    {
        name:'Guedes, 1985',
        id:'Guedes-1985',
        description:'<p>Homens e mulheres de 17 á 27 anos<br>Dados: dobras triciptal, suprailíaca e abdôminal <br>Masculino = 1,17136 - 0,06706 x LOG10(triciptal + suprailiaca + abdôminal)<br>Feminino = 1,166550 - 0,07063 x LOG10(subescapular + suprailíaca + coxa)<br></p>'
    },

]

function bota_underline_aumenta_font(item_selected){// boto underline e aumento tamanho de fonte do item selecionado no menu de equações de densidade corporal
   item_selected.parentNode.childNodes.forEach((el,index) => {
       if(index%2!=0){el.style.border = 'none';el.style.fontSize = '16px'}
   });
   item_selected.style.borderBottom = '4px solid white'
   item_selected.style.fontSize = '18px'
   
   conteudo = filtra_arrObj_por_prop_id(obj_protocolos_densidade_gordura,item_selected.getAttribute('id'))
   troca_conteudo_paragrafo_densidade(conteudo)
   troca_funcao_botao(item_selected.getAttribute('id'))
}
function troca_conteudo_paragrafo_densidade(conteudo){//troco o conteudo do paragrafo para o texto da equação selecionada
    var titulo = document.getElementById('tittle-dinamic')
    titulo.innerHTML = conteudo.name
    var paragrafo = document.getElementById('para-dinamic')
    paragrafo.innerHTML = conteudo.description

}
function calcular(equacao){
   dados = verifica_inputs_den_gor()
   console.log(dados)
   if(dados != false || null){
        if(equacao == 'Jackson-e-Pullock-1978'){
            let user = new Dados_Jackson_Pullock_1978(dados[0].valor,parseInt(dados[1].valor),parseFloat(dados[2].valor), parseFloat(dados[4].valor),parseFloat(dados[3].valor))
            user.soma_dobras()
            user.densidade_corporal()
            user.siri()
            console.log(user)
            if(dados[0].valor != 'M'){
                alert('Está equação é para homens de 18 á 61 anos!')
            }
            bota_resultado_den_gor(user.densidade, user.gordura_corporal)
       }
       if(equacao == 'Sloan-masculino'){
            let user = new Dados_Sloan_Masculino(dados[0].valor, parseInt(dados[1].valor), parseFloat(dados[5].valor), parseFloat(dados[3].valor))
            user.densidade_corporal()
            user.siri()
            console.log(user)
            if(user.sexo != 'M' || user.idade > 26 || user.idade<18){
                alert( 'Está equação é para homens entre 18 á 26 anos!')
            }
            bota_resultado_den_gor(user.densidade, user.gordura_corporal)

       }
       if(equacao == 'Sloan-Burt-&-Blyth-feminino'){
            let user = new Dados_Sloan_Blyth_Burt_Feminino(dados[0].valor, parseInt(dados[1].valor),parseFloat(dados[6].valor), parseFloat(dados[7].valor))    
            user.densidade_corporal()
            user.siri()
            console.log(user)
            if(user.sexo != 'F'){
                alert( 'Está equação é para mulheres!')
            }
            bota_resultado_den_gor(user.densidade, user.gordura_corporal)
       }
       if(equacao == 'Guedes-1985'){
            let user = new Dados_guedes(dados[0].valor, parseInt(dados[1].valor), parseFloat(dados[7].valor), parseFloat(dados[6].valor), parseFloat(dados[4].valor), parseFloat(dados[5].valor), parseFloat(dados[3].valor))
            user.densidade_corporal()
            user.siri()
            console.log(user)
            if(user.idade < 17 || user.idade > 27){
                alert( 'Está equação é para pessoas com idade entre 17 á 27 anos!')
            }
            bota_resultado_den_gor(user.densidade, user.gordura_corporal)
       }
   }
}
function troca_funcao_botao(item_selecionado){
    var botao = document.getElementById('botao-den-gor')
    botao.removeAttribute('onclick')
    botao.setAttribute('onclick',`calcular('${item_selecionado}')`)
}
function verifica_inputs_den_gor(){//Verificação dos inputs
    var inputs_den_gor =  document.getElementsByClassName("input-den-gor")
    for(value of inputs_den_gor){// reseto a cor para que o usuario nao seja alertado sobre erro sem necessidade
        value.style.backgroundColor = '#ffffff'
    }
    inputs_sem_valor = []
    valores_validos_den_gor = []
    for(value of inputs_den_gor){//identifico inputs sem valor digitado
        if(value.value.length<1 || value.value < 0 || value.value > 110){// verifico se o valores nos inputs são validos
            value.style.backgroundColor = '#db656141'
            inputs_sem_valor.push(value.getAttribute('id'))//Pego o nome do input e lança para uma lista de erros
        }else{//Caso nao tenha nenhum erro cvou juntar os dados
            obj = {// este objeto contem os valores dos inputs
                prop: value.getAttribute('id'),
                valor: value.value
            }
            valores_validos_den_gor.push(obj)                      
        }
    }
    if(inputs_sem_valor.length > 0){//Boto mensagem de erro para o usuario caso os inputs nao sejam marcados
        error_msg = ''
        inputs_sem_valor.forEach((el,index)=>{
            if(index == 0){
                error_msg = el
            }else if(index == inputs_sem_valor.length -1){
                error_msg += ` e ${el}`
            }else{
                error_msg += `, ${el}`
            }
            
        })
        alert(error_msg + ' precisam ter valores válidos para o cálculo!')
        return false
    }else{//Caso nenhum erro seja identificado
        return valores_validos_den_gor
    }
}
function filtra_arrObj_por_prop_id(obj,id){
    retorno = null
    obj.forEach((el)=>{
        if(el.id == id){
            retorno = el
        }
    })
    return retorno
}
function bota_resultado_den_gor(densidade, gordura_corporal){
    var bloco_densidade = document.getElementById('resposta-densidade')
    var bloco_gordura = document.getElementById('resposta-gordura')
    console.log(densidade.toFixed(2).replace(".",","), gordura_corporal)
    bloco_densidade.innerHTML = densidade.toFixed(2).replace(".",",") + " g/ml"
    bloco_gordura.innerHTML = gordura_corporal.toFixed(2).replace(".",",") + " %"
}